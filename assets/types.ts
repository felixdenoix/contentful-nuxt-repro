import { Document } from "@contentful/rich-text-types";
import { ContentType, Entry, Asset } from 'contentful'

export interface LayoutFields {
  title: string
  seoDescription: string
  seoImage: Asset
  navigation: NavigationLinkFields[]
  contactEmail: string
  instagramTag: string
}

export interface NavigationLinkFields {
  item?: Entry<PageFields>,
  url?: string,
  title: string
}

export interface PageFields {
  title: string
  url: string
  content: Document
  layout: Entry<LayoutFields>
}
