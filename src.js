const icon_width = 79,
  icon_height = 79,
  num_icons = 9,
  time_per_icon = 100,
  indexes = [0, 0, 0];
iconMap = [
  "banana",
  "seven",
  "cherry",
  "plum",
  "orange",
  "bell",
  "bar",
  "lemon",
  "melon",
];

const roll = (reel, offset = 0) => {
  const delta =
    (offset + 2) * num_icons + Math.floor(Math.random() * num_icons);
  const style = getComputedStyle(reel),
    backgroundPositionY = parseFloat(style["background-position-y"]);
  (targetBackgroundPositionY = backgroundPositionY + delta * icon_height),
    (normTargetBackgroundPositionY =
      targetBackgroundPositionY % (num_icons * icon_height));

  return new Promise((resolve, reject) => {
    reel.style.transition = `background-position-y ${
      8 + delta * time_per_icon
    }ms`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

    setTimeout(() => {
      reel.style.transition = "none";
      reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}`;
      resolve(delta % num_icons);
    }, 8 + delta * time_per_icon);
  });
};

function rollAll() {
  const reelsList = document.querySelectorAll(".slots > .reel");
  Promise.all([...reelsList].map((reel, i) => roll(reel, i))).then(deltas => {
    deltas.forEach(
      (delta, i) => (indexes[i] = (indexes[i] + delta) % num_icons)
    );
    indexes.map(index => console.log(iconMap[index]));

    // check win conditions
    if (indexes[0] == indexes[1] || (indexes[0] == indexes[1]) == indexes[2]) {
      console.log("⭐ -----BIGGGG WINNNN------ ⭐");
    }
    setTimeout(rollAll, 2000);
  });
  // [...reelsList].map((reel, i) => {
  //   console.log(reel, i);
  //   roll(reel, i).then(delta => {
  //     console.log(delta);
  //   });
  // });
}

rollAll();
