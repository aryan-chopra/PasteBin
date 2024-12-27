import { memo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownMenu = memo(function DropdownMenu({ items, heading, updateFunction }) {
    console.log("Rendering menu")
    const [title, setTitle] = useState(items[0])

    let headingText
    if (!heading) {
        headingText = <p className="mb-2 fs-5" style={{ display: "none" }}></p>
    }

    else {
        headingText = <p className="font-weight-bold mb-2 fs-5" style={{ display: "inline-block" }}>{heading}</p>
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
})

export default DropdownMenu
