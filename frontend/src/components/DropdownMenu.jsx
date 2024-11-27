import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function DropdownMenu({ items, heading }) {

    const [title, setTitle] = useState(items[0])

    let menuList = items.map((item) =>
        <Dropdown.Item key={item} onClick={updateTitle} href='#'>{item}</Dropdown.Item>
    )

    function updateTitle(e) {
        setTitle(e.target.innerText)
    }

    return (
        <>
            <p className="mb-2 fs-5" style={{ display: "inline-block" }}>{heading}</p>

            <DropdownButton className='w-25' id="dropdown-basic-button" title={title}>
                {console.log(menuList)}

                {menuList}
                {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
            </DropdownButton>
        </>
    )
}
