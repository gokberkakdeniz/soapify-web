const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("en-GB");

export default formatDate;
