// controller
function doClick() {
    points += pointsPerClick;
    smileyIndex = 1 - smileyIndex;
    updateView();
}

function buyUpgrade() {
    if (points < 10) return;
    points -= 10;
    pointsPerClick++;
    updateView();
}

function iAmACheater() {
    cheatIndex = "You're a cheater";
    points = points*10;
    pointsPerClick = pointsPerClick*10;
    updateView();
}