// Spinner style - https://github.com/lukehaas/css-loaders

export const styles = `
.block-ui-wrapper {
  display: none;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.70);
  z-index: 30000;
  cursor: wait;
}

.block-ui-wrapper.block-ui-wrapper--element {
  position: absolute;
}

.block-ui-wrapper.active {
  display: block;
}

.block-ui-wrapper.block-ui-main {
  position: fixed;
}

.block-ui-spinner,
.block-ui-template {
  position: absolute;
  top: 40%;
  margin: 0 auto;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.block-ui-spinner > .message {
  font-size: 1.3em;
  text-align: center;
  color: #fff;
}

.block-ui__element {
  position: relative;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 7px auto;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
