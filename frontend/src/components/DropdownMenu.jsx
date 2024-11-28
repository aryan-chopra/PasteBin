import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function DropdownMenu({ items, heading, updateFunction }) {

    const [title, setTitle] = useState(items[0])

    let headingText
    if (!heading) {
        console.log("heading: " + heading);
        headingText = <p className="mb-2 fs-5" style={{ display: "none" }}></p>
    }

    else {
        console.log("rendering");
        headingText = <p className="mb-2 fs-5" style={{ display: "inline-block" }}>{heading}</p>
    }

    let menuList = items.map((item) =>
        <Dropdown.Item key={item} onClick={updateSelection} href='#'>{item}</Dropdown.Item>
    )

    function updateSelection(e) {
        updateFunction(e.target.innerText)
        setTitle(e.target.innerText)
    }

    return (
        <>
            {headingText}

            <DropdownButton style={{width: '15vw'}} id="dropdown-basic-button" title={title}>
                {menuList}
            </DropdownButton>
        </>
    )
}
