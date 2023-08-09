import { css } from "@lion/core";

export const UserMenuStyles = css
`
dialog {
    color: var(--primary-color);
    border-radius: var(--border-radius-l);
}

.wrapper{
    background-color: var(--navigation-background-color);
    padding:20px;display:flex;justify-content:flex-end;
    color:white;
    border-bottom:1px solid var(--primary-color);
}

.extra-menu-wrapper{
    display:flex; flex-direction:row;
    justify-content: flex-end;
    align-items:center;
}

.extra-menu-list{
    display:flex; list-style-type:none;
}

.extra-menu-listitem{
    text-decoration:none;
    padding:10px;
    color:var(--navigation-item-color);

}
.login-menu-wrapper{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
}

.login-button{
    margin-right:15px;
}


@media only screen and (max-width: 860px) {
    .extra-menu-accessibility {
      display:none;
    }
    .accessibility-icon{
        margin:0 20px;
    }
  }

    `