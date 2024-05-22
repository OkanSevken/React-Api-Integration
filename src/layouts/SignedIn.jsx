import React from "react";
import { Button, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignedIn({ signOut }) {
  return (
    <div>
      <MenuItem>
        <Link to="/">
          <Button primary onClick={signOut}>
            Çıkış Yap
          </Button>
        </Link>
      </MenuItem>
    </div>
  );
}
