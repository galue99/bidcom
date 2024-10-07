import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Link {
  id: string;
  target: string;
  link: string;
  stats: number;
  password?: string;
  expirationDate?: Date;
  isValid: boolean;
}

@Injectable()
export class LinkService {
  private links = new Map<string, Link>();

  createLink(target: string, password?: string, expirationDate?: Date): Link {

    if (!this.isValidUrl(target)) {
      throw new BadRequestException('La URL proporcionada no es válida');
    }

    const id = uuidv4();
    const link = `http://localhost:3000/l/${id}`;

    const newLink: Link = {
      id,
      target,
      link,
      stats: 0,
      password,
      expirationDate,
      isValid: true,
    };

    this.links.set(id, newLink);
    return newLink;
  }

  getLinkById(id: string, password?: string): Link | null {
    const link = this.links.get(id);

    if (!link) {
      return null;
    }

    if (link.expirationDate && new Date() > link.expirationDate) {
      link.isValid = false;
    }

    if (link.password && link.password !== password) {
      return null;
    }

    if (!link.isValid) {
      return null;
    }

    return link;
  }

  invalidateLink(id: string): boolean {
    const link = this.links.get(id);
    if (link) {
      link.isValid = false;
      return true;
    }
    return false;
  }

  incrementStats(id: string): void {
    const link = this.links.get(id);
    if (link && link.isValid) {
      link.stats += 1;
    }
  }

  getStats(id: string): number | undefined {
    const link = this.links.get(id);
    return link?.stats;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

}
