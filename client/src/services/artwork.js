import { fetchApi, unwrapAtributes } from "./strapi";

const getArtworks = async () => {
    const artworks = await fetchApi({ endpoint: "artworks", wrappedByKey: "data" });
    if (!artworks) return [];
    return artworks.map(unwrapAtributes);
};
const createArtwork = async (data) => {
    console.log(data);
    const artwork = await fetchApi(
        {
            endpoint: "artworks",
        },
        {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return unwrapAtributes(artwork);
};
// const deleteArtwork = async (id, data) => {
//     const artwork = await fetchApi(
//         {
//             endpoint: `artworks/${id}`,
//         },
//         {
//             method: "DELETE",
//             body: JSON.stringify({ data }),
//             headers: {
//                 "Content-Type": "application/json",
//                 // Authorization: `Bearer ${getToken()}`,
//             },
//         }
//     );
//     return unwrapAtributes(artwork);
// };

const editArtwork = async(id, data) => {
    const artwork = await fetchApi(
        {
            endpoint: `artworks/${id}`,
        },
        {
            method: "PUT",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return unwrapAtributes(artwork);
}

const getArtworkById = async (id) => {
    const artwork = await fetchApi({
        endpoint: `artworks/${id}`,
        query: { populate: ["owner"] },
        wrappedByKey: "data",
    });
    return unwrapAtributes(artwork);
};

export { getArtworks, createArtwork, getArtworkById, editArtwork };
