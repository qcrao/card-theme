export async function loadLeftToggleStart() {
  const mySleep = (m) => new Promise((r) => setTimeout(r, m));

  // Loop to check if roam-topbar has been loaded yet
  for (let y = 1; y < 20; y++) {
    if (
      document.getElementsByClassName("rm-topbar") != null &&
      document.getElementsByClassName("roam-body-main") != null &&
      document.getElementById("right-sidebar") != null
    ) {
      if (
        document.getElementsByClassName("rm-topbar").length > 0 &&
        document.getElementsByClassName("roam-body-main").length > 0
      ) {
        break;
      }
    }
    await mySleep(100);
  }

  // Sleep for an extra bit to load later than other icons (200 = 3rd)
  await mySleep(200);

  function toggleLeftSide() {
    const roamAppFlex = document.querySelector("div.roam-app > div.flex-h-box");
    const roamRSBCont = document.getElementById("roam-right-sidebar-content");
    if (roamRSBCont && roamAppFlex) {
      if (roamRSBCont.style.overflow == "visible") {
        // Make main left side pinned
        roamAppFlex.style.removeProperty("overflow");
        roamRSBCont.style.setProperty("overflow", "auto");
        const sbButton = document.getElementsByClassName(
          "bp3-button bp3-minimal bp3-small bp3-icon-standard bp3-icon-menu-open"
        );
        if (sbButton.length == 1) {
          const sbButtonElem = sbButton[0];
          sbButtonElem.style.opacity = 1;
          sbButtonElem.style.zIndex = 1001;
        }
      } else {
        // Allow the right sidebar to scroll the entire screen (un-pin main left)
        roamAppFlex.style.setProperty("overflow", "auto");
        roamRSBCont.style.setProperty("overflow", "visible", "important");
        const sbButton = document.getElementsByClassName(
          "bp3-button bp3-minimal bp3-small bp3-icon-standard bp3-icon-menu-open"
        );
        if (sbButton.length == 1) {
          const sbButtonElem = sbButton[0];
          sbButtonElem.style.opacity = 0;
          sbButtonElem.style.zIndex = 1;
        }
      }
    }
  }

  // Add button
  const nameToUse = "unpin-left-main";
  const bpIconName = "pin";

  const checkForButton = document.getElementById(nameToUse + "-icon");
  if (!checkForButton) {
    const mainButton = document.createElement("span");
    mainButton.id = nameToUse + "-button";
    mainButton.classList.add("bp3-popover-wrapper");

    const spanTwo = document.createElement("span");
    spanTwo.classList.add("bp3-popover-target");
    mainButton.appendChild(spanTwo);

    const mainIcon = document.createElement("span");
    mainIcon.id = nameToUse + "-icon";
    mainIcon.classList.add(
      "bp3-icon-" + bpIconName,
      "bp3-button",
      "bp3-minimal",
      "bp3-small",
      "murf-icon"
    );
    spanTwo.appendChild(mainIcon);

    const roamTopbar = document.getElementsByClassName("rm-topbar");
    const nextIconButton = roamTopbar[0].lastElementChild;

    const flexDiv = document.createElement("div");
    flexDiv.id = nameToUse + "-flex-space";
    flexDiv.className = "rm-topbar__spacer-sm";

    nextIconButton.insertAdjacentElement("afterend", mainButton);
    mainButton.insertAdjacentElement("afterend", flexDiv);
    mainButton.addEventListener("click", toggleLeftSide);
  }
}
