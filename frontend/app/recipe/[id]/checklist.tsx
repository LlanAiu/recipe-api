'use client';

import { useState } from 'react';


export default function CheckList({description} : {
    description: string,
}) {

    const [checked, setChecked] = useState(false);
    

    return (
        <div>
            <button onClick={() => setChecked(s => !s)}>
                {checked ? 
                    <li><s>{description}</s></li> :
                    <li>{description}</li>
                }
            </button>
        </div>

    );
}