import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: { type: "string" },
    shortdescription: { type: "string" },
    image: { type: "string" },
    author: { type: "string" },
    publishAt: { type: "date" },
    updatedAt: { type: "date" },
  },
  computedFields: {
    url_path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/pages\/?/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
