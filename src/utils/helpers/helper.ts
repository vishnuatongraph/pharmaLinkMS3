export function convertBigIntToString(obj: any) {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    ),
  );
}

export function getIsoDateFormat(dateValue: string) {
  return new Date(dateValue).toISOString().split("T")[0];
}
