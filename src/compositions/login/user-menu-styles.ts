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
    // border-bottom:1px solid var(--primary-color);
    position: relative;
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

.extra-menu-listitem:hover {
    color:var(--navigation-item-hover-color);
    fill:var(--navigation-item-hover-color)
}

.login-menu-wrapper{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
}

.register-button{
    margin-right:15px;
}




@media only screen and (max-width: 860px) {
    .accessibility-icon{
        margin:0 20px;
        
    }
 
  }

  @media only screen and (max-width: 640px) {
    .extra-menu-listitem{
        display:none;
    }
  }
  .dropdown{
    position:absolute;
    top:70px;
    display:flex;
    flex-direction:column 
  }

  .user-name{
    color:var(--navigation-item-color);
  }

  bcg-icon>svg{
    fill:var(--navigation-icon-color);
    }

  bcg-icon>svg:hover{
    fill:var(--navigation-icon-hover-color);
  }

  a + bcg-icon:hover{
    fill:blue;
  }

  .extra-menu-dropdown{
    position:relative;
    display:flex;
    flex-direction:column;
  }

  .extra-menu-dropdowncontent{
    position:absolute;
    top:40px;
    display:flex;
    flex-direction:column;
  }

  .extra-menu-dropdowncontent:first-child{
border
  }
  
  .extra-menu-dropdownitem{
    background-color: var(--navigation-background-color);
    height: 100%;
    display: block;
    border-bottom: 1px solid var(--primary-color);
  }

  .expand-icon {
    width: 12px;
    height: 12px;
}




  `
