import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, MenuItem,Image } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
  return (
    <div>
        <MenuItem>
            <Image avatar spaced="right" src="https://media.licdn.com/dms/image/D4D03AQHekpT9Miq5Fg/profile-displayphoto-shrink_200_200/0/1680349371730?e=2147483647&v=beta&t=V45cpwWRS4tGd4BBBEoBY4RLheFJlVyfGvFxGnkA-S0"></Image>
            <Dropdown pointing="top left" text='Okan'>
                <DropdownMenu>
                    <DropdownItem text="Bilgilerim" icon="info"/>
                    <DropdownItem onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                </DropdownMenu>
            </Dropdown>
        </MenuItem>
    </div>
  )
}


