export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  author: string;
  content: DynamicZoneComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

export interface RichTextComponent extends DynamicZoneComponent {
  __component: "shared.rich-text";
  body: string;
}

export interface QuoteComponent extends DynamicZoneComponent {
  __component: "shared.quote";
  title: string;
  body: string;
}

export interface MediaComponent {
  __component: "shared.media";
  file: {
    url: string;
    alternativeText?: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
