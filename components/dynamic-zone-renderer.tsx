import type {
  DynamicZoneComponent,
  RichTextComponent,
  QuoteComponent,
  MediaComponent,
} from "@/types/blog";
import Image from "next/image";

interface DynamicZoneRendererProps {
  components: DynamicZoneComponent[];
}

function serializeRichText(value: any): string {
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      const text =
        block.children?.map((child: any) => child.text).join("") ?? "";

      switch (block.type) {
        case "paragraph":
          return `<p>${text}</p>`;
        // add more block types here if needed
        default:
          return text;
      }
    })
    .join("");
}

function RichText({ body }: { body: any }) {
  console.log("body",body);
  const html = serializeRichText(body);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Quote({ title, body }: { title: string; body: string }) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-gray-50 rounded-r-lg">
      {title && <h4 className="font-semibold text-lg mb-2">{title}</h4>}
      <p className="text-gray-700 italic">{body}</p>
    </blockquote>
  );
}

function Media({ file }: { file: any }) {
  console.log("MEDIA FILE:", file);

  if (!file?.url) return null;

  const imageUrl = file.url.startsWith("http")
    ? file.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
        file.url
      }`;

  console.log("imageUrl", imageUrl);

  return (
    <div className="my-6">
      <Image
        src={imageUrl}
        alt={file.alternativeText || "Blog image"}
        width={800}
        height={400}
        className="rounded-lg shadow-md w-full h-auto"
      />
    </div>
  );
}

export default function DynamicZoneRenderer({
  components,
}: DynamicZoneRendererProps) {
  if (!components || components.length === 0) {
    return <p className="text-gray-500">No content available.</p>;
  }

  return (
    <div className="space-y-6">
      {components.map((component, index) => {
        switch (component.__component) {
          case "shared.rich-text":
            const richTextComponent = component as RichTextComponent;
            return <RichText key={index} body={richTextComponent.body} />;

          case "shared.quote":
            const quoteComponent = component as QuoteComponent;
            return (
              <Quote
                key={index}
                title={quoteComponent.title}
                body={quoteComponent.body}
              />
            );

          case "shared.media": {
            const mediaComponent = component as any;
            console.log("MEDIA COMPONENT:", mediaComponent);
            return <Media key={index} file={mediaComponent.file} />;
          }

          default:
            console.warn(`Unknown component type: ${component.__component}`);
            return (
              <div
                key={index}
                className="p-4 bg-yellow-100 border border-yellow-300 rounded"
              >
                <p className="text-yellow-800">
                  Unknown component type: {component.__component}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}
