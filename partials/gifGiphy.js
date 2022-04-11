import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import React from "react";
const gf = new GiphyFetch("YINZPgcdhDULmoZoozvoUUaecGVvFhHN");

const GifGiphy = ({ gifText, setGifImg, setAnchorElGif }) => {
    const GridDemo = ({ onGifClick }) => {
        const fetchGifs = () => gf.search(gifText, { offset: 15, limit: 50 });
        const trendingFetchGifs = () => gf.trending(gifText, { offset: 15, limit: 50 });

        return (
            <>
                <Grid
                    onGifClick={onGifClick}
                    width={300}
                    columns={2}
                    gutter={4}
                    fetchGifs={ gifText.length > 0 ? fetchGifs : trendingFetchGifs}
                    key={gifText}
                    hideAttribution={true}
                />
            </>
        );
    };
    return (
        <>
            <GridDemo
                onGifClick={(gif, e) => {
                    e.preventDefault();
                    setGifImg(gif.images.fixed_height_small.url);
                    setAnchorElGif(null);
                }}
            />
        </>
    );
};

export default GifGiphy;
