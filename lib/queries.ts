import queryString from "query-string";

export const getBusiness = async ({
  domain,
  subdomain,
}: {
  domain?: string;
  subdomain?: string;
}) => {
  try {
    console.log(
      `${
        process.env["NEXT_PUBLIC_API_URL"]
      }/api/business/?${queryString.stringify(
        { domain, subdomain },
        { skipNull: true }
      )}`
    );
    let business = await(
      await fetch(
        `${
          process.env["NEXT_PUBLIC_API_URL"]
        }/api/business/?${queryString.stringify(
          { domain, subdomain },
          { skipNull: true }
        )}`
      )
    )
      .json()
      .then((resp) => resp)
      .catch((error) => {
        throw error;
      });

    return business;
    // return "business";
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get business details", { cause: error });
  }
};
