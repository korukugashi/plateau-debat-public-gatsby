import CMS from "netlify-cms-app"
import { fr } from "netlify-cms-locales";
import React from "react"

import TeamPreview from './preview-templates/TeamPreview';
import NewsPreview from './preview-templates/NewsPreview';
import FilesPreview from './preview-templates/FilesPreview';
import '../components/all.sass';
import '../components/dontpurge.sass';

CMS.registerLocale('fr', fr);

CMS.registerPreviewTemplate('team', TeamPreview);
CMS.registerPreviewTemplate('actions', NewsPreview);
CMS.registerPreviewTemplate('files', FilesPreview);

CMS.registerEditorComponent({
  label: 'Image',
  id: 'image',
  fromBlock: match =>
    match && {
      image: match[2],
      title: match[1],
      width: match[4],
      cssclass: match[6],
    },
  toBlock: ({ image, title, width, cssclass }) =>
    `![${title || ''}](${image || ''}${width ? `?nf_resize=fit&w=${width}` : ''}${cssclass ? `#${cssclass}` : ''}${title ? ` "${title.replace(/"/g, '\\"')}"` : ''})`,
  toPreview: ({ image, title, width, cssclass }, getAsset, fields) => {
    const imageField = fields?.find(f => f.get('widget') === 'image');
    const src = getAsset(image, imageField);
    return <img src={src || ''} alt={title || ''} title={title || ''} className={cssclass} style={{width: width || 'auto'}} />;
  },
  pattern: /^!\[(.*)\]\((.*?)(\?nf_resize=fit&w=([1-9]*))?(#([a-z-]*))?(\s"(.*)")?\)$/,
  fields: [
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
      required: true,
    },
    {
      label: 'Titre de l\'image (infobulle et texte alternatif)',
      name: 'title',
      required: true,
    },
    {
      label: 'Alignement',
      name: 'cssclass',
      widget: "select",
      options: [
        { label: "Gauche", value: "img-left" },
        { label: "Centré", value: "img-center" },
        { label: "Droite", value: "img-right" },
      ],
      default: "center",
      required: true,
    },
    {
      label: 'Largeur (pixels)',
      name: 'width',
      widget: "number",
      default: 400,
      min: 30,
      max: 800,
      required: true,
    },
  ],
});
