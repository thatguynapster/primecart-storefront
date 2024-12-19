export const getBusiness = async (name: string) => {
  try {
    console.log(
      `fetching from: ${process.env["NEXT_PUBLIC_API_URL"]}/api/business?business=${name}`
    );
    let business = await (
      await fetch(
        `${process.env["NEXT_PUBLIC_API_URL"]}/api/business?business=${name}`
      )
    )
      .json()
      .then((resp) => resp)
      .catch((error) => {
        throw error;
      });

    return business;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get business details", { cause: error });
  }
};
