export const style = new CSSStyleSheet();

style.replace(`
.error-modal {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
    background: #fff;
    padding: 0 40px;
    box-shadow: 5px 5px 3px #666;
    border-top: 5px solid red;
  
    transition: visibility 1s;
    animation: fade-in 1s linear;
    -webkit-animation: fade-in 1s linear;
  }
  
  .message {
    font-size: 24px;
    font-weight: bold;
    color: #000;
  }
  
  .hidden {
    animation: fade-out 1s linear;
    -webkit-animation: fade-out 1s linear;
    visibility: hidden;
  }
  
  @-webkit-keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @media (min-width: 320px) and (max-width: 420px) {
    .error-modal {
      width:fit-content;
    }
  }
`);
