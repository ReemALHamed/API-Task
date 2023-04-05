export const TagsCollection = ({ tags }) => {
  return (
    <div className="flex w-full flex-wrap my-3 ml-0">
      {tags?.map((tag) => (
        <p
          key={tag.target_id}
          className="border-2 bg-blue-500 text-white rounded-2xl capitalize px-4 py-1 m-1 ml-0 text-xs"
        >
          {tag.taxonomy_term_name}
        </p>
      ))}
    </div>
  );
};
