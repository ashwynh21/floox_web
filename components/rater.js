import Rating from "./rating";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { root } from "../scripts/environment";

export default function Rater() {
    const [loading, setter] = useState(false);
    const [sent, submit] = useState(false);
    const [value, update] = useState(10);

    const rate = (event) => {
        setter(true);
        return fetch(`${root}/rating`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: value,
                created: new Date().toISOString(),
                updated: new Date().toISOString(),
            })
        })
            .then(async (response) => {
                await response.json();

                submit(true);
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setter(false);
            });
    };

    return (
        <>
            {
                !sent && <div>
                    <Rating onChange={update} value={value}/>
                    <Button border id="rating" onClick={rate}>
                        {
                            !loading && <div>
                                <Image src="/icons/send.svg" width={16} height={16}/>
                                <p>Send</p>
                            </div>
                        }

                        {
                            loading && <CircularProgress size={24} color={'white'}/>
                        }
                    </Button>
                </div>
            }

            {
                sent && <Button>Awesome, thanks for your feedback!</Button>
            }

        </>
    )
}
