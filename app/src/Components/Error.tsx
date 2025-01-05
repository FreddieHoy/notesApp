export const ErrorMessage = ({ error }: { error?: string }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>There was an error:</p>
      {error ? <p>{error}</p> : "Something went wrong"}
    </div>
  );
};
