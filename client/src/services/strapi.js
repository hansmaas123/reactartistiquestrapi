import qs from "qs";

const fetchApi = async (
    {
        endpoint,
        query = undefined,
        wrappedByKey = undefined,
        wrappedByList = undefined,
    },
    options
) => {
    if (endpoint.startsWith("/")) {
        endpoint = endpoint.slice(1);
    }

    const url = new URL(
        `${import.meta.env.VITE_STRAPI_URL}/api/${endpoint}${query ? `?${qs.stringify(query, { encode: false })}` : ``
        }`
    );

    console.log("Fetching...", url.toString());

    const res = await fetch(url.toString(), options);

    let data = await res.json();

    if (!res.ok) {
        throw new Error(
            `Error fetching ${url.toString()} - ${data?.error?.message}`
        );
    }

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    if (wrappedByList) {
        data = data[0];
    }

    return data;
};

const unwrapAtributes = (item) => {
    return { ...item, ...item.attributes };
};

export { fetchApi, unwrapAtributes };
