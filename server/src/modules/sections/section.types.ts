import { SectionDocument } from './section.model';

export interface CreateSectionDTO {
  title: string;
  order: number;
  courseId: string;
}

export interface UpdateSectionDTO {
  title: string;
}

export { SectionDocument };
