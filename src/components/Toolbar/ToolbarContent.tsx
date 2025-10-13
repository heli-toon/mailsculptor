import React from 'react';
import { ToolbarSection } from './ToolbarSection';
import { DraggableItem } from './DraggableItem';

export function ToolbarContent() {
  return (
    <>
      <ToolbarSection title="Basic Elements" icon="puzzle">
        <DraggableItem type="text" icon="type" label="Text" description="Add paragraph text" />
        <DraggableItem type="heading" icon="type-h1" label="Heading" description="Add a heading" />
        <DraggableItem type="button" icon="square" label="Button" description="Call-to-action button" />
        <DraggableItem type="link" icon="link" label="Link" description="Text link" />
      </ToolbarSection>

      <ToolbarSection title="Media" icon="image">
        <DraggableItem type="image" icon="image" label="Image" description="Add an image" />
        <DraggableItem type="logo" icon="badge-wc" label="Logo" description="Company logo" />
      </ToolbarSection>

      <ToolbarSection title="Layout" icon="grid-3x3-gap">
        <DraggableItem type="row" icon="layout-three-columns" label="Columns" description="Multi-column layout" />
        <DraggableItem type="divider" icon="dash-lg" label="Divider" description="Horizontal line" />
        <DraggableItem type="spacer" icon="arrows-vertical" label="Spacer" description="Add vertical space" />
      </ToolbarSection>

      <ToolbarSection title="Social" icon="share">
        <DraggableItem type="social" icon="share" label="Social Icons" description="Social media links" />
      </ToolbarSection>
    </>
  );
}
