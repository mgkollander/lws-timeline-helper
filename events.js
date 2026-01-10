// defines: window.getEventsUTC(baseUTC: DateTime) => Array<event>
(function () {
  const DateTime = luxon.DateTime;

  function getEventsUTC(baseUTC) {
    const mon = baseUTC.setZone('UTC').startOf('day');
    const tue = mon.plus({ days: 1 });
    const wed = mon.plus({ days: 2 });
    const thu = mon.plus({ days: 3 });
    const fri = mon.plus({ days: 4 });
    const sat = mon.plus({ days: 5 });
    const sun = mon.plus({ days: 6 });

    const COLORS = {
      darkBlue: '#1e3a8a',
      lightBlue: '#3b82f6',
      orange: '#f59e0b',
      green: '#22c55e',
      red: '#ef4444',
      white: '#ffffff',
      purple: '#af69ed'
    };

    // TODO: sloppy
    return [
      { id: 'ar-tech-sun-1', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: sun.plus({ hours: 10 }), end: sun.plus({ hours: 14 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'research-speedups', title: 'Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-base-sun-1', title: 'Arms Race: Base Building', color: COLORS.orange, start: sun.plus({ hours: 14 }), end: sun.plus({ hours: 18 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'construction-speedups', title: 'Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-unit-sun-1', title: 'Arms Race: Unit Progression', color: COLORS.green, start: sun.plus({ hours: 18 }), end: sun.plus({ hours: 22 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'training-speedups', title: 'Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-tech-sun-2', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: sun.plus({ hours: 22 }), end: sun.plus({ days: 1, hours: 2 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'research-speedups', title: 'Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'vs-radar', title: 'Alliance Versus: Radar Training', color: COLORS.lightBlue, start: mon.plus({ hours: 2 }), end: tue.plus({ hours: 2 }), tasks: [
        { id: 'radar-tasks', title: 'Do Radar Tasks', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
        { id: 'use-drone-parts', title: 'Use Drone Parts', done: false },
        { id: 'gather-gold', title: 'Gather Gold', done: false },
        { id: 'gather-iron', title: 'Gather Iron', done: false },
        { id: 'gather-food', title: 'Gather Food', done: false },
        { id: 'fin-double-dip-drone-data', title: 'Drone Data (No more double dipping)', done: false, unlockMin: 1200 },
        { id: 'fin-double-dip-stamina', title: 'Stamina (No more double dipping)', done: false, unlockMin: 1200 },
      ] },
      { id: 'ar-base-sun-2', title: 'Arms Race: Base Building', color: COLORS.orange, start: mon.plus({ hours: 2 }), end: mon.plus({ hours: 6 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'construction-speedups', title: 'Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-unit-sun-2', title: 'Arms Race: Unit Progression', color: COLORS.green, start: mon.plus({ hours: 6 }), end: mon.plus({ hours: 10 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'training-speedups', title: 'Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-hero-mon-1', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: mon.plus({ hours: 10 }), end: mon.plus({ hours: 14 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'ar-tech-mon-1', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: mon.plus({ hours: 14 }), end: mon.plus({ hours: 18 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'research-speedups', title: 'Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-mon', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: mon.plus({ hours: 18 }), end: mon.plus({ hours: 22 }), tasks: [
        { id: 'double-dip-drone-data', title: 'DOUBLE DIP - Drone Data', done: false },
        { id: 'double-dip-stamina', title: 'DOUBLE DIP - Stamina', done: false },
      ] },
      { id: 'ar-hero-mon-2', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: mon.plus({ hours: 22 }), end: tue.plus({ hours: 2 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'vs-base-expansion', title: 'Alliance Versus: Base Expansion', color: COLORS.orange, start: tue.plus({ hours: 2 }), end: wed.plus({ hours: 2 }), tasks: [
        { id: 'ur-tasks', title: 'Do UR Tasks', done: false },
        { id: 'deploy-ur-trucks', title: 'Deploy UR Trucks', done: false },
        { id: 'survivor-tickets', title: 'Use Survivor Recruitment Tickets', done: false },
      ] },
      { id: 'ar-unit-mon-3', title: 'Arms Race: Unit Progression', color: COLORS.green, start: tue.plus({ hours: 2 }), end: tue.plus({ hours: 6 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'training-speedups', title: 'Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-tech-mon-2', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: tue.plus({ hours: 6 }), end: tue.plus({ hours: 10 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'research-speedups', title: 'Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-base-tue-1', title: 'Arms Race: Base Building', color: COLORS.orange, start: tue.plus({ hours: 10 }), end: tue.plus({ hours: 14 }), tasks: [
        { id: 'double-dip-inc-build', title: 'DOUBLE DIP - Increase Building Power', done: false },
        { id: 'double-dip-construction', title: 'DOUBLE DIP - Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-tue-1', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: tue.plus({ hours: 14 }), end: tue.plus({ hours: 18 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'stamina', title: 'Stamina', done: false },
      ] },
      { id: 'ar-hero-tue-1', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: tue.plus({ hours: 18 }), end: tue.plus({ hours: 22 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'ar-base-tue-2', title: 'Arms Race: Base Building', color: COLORS.orange, start: tue.plus({ hours: 22 }), end: wed.plus({ hours: 2 }), tasks: [
        { id: 'double-dip-inc-build', title: 'DOUBLE DIP - Increase Building Power', done: false },
        { id: 'double-dip-construction', title: 'DOUBLE DIP - Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'vs-age-science', title: 'Alliance Versus: Age of Science', color: COLORS.darkBlue, start: wed.plus({ hours: 2 }), end: thu.plus({ hours: 2 }), tasks: [
        { id: 'radar-tasks', title: 'Do Radar Tasks', done: false },
        { id: 'valor-badges', title: 'Use Valor Badges', done: false },
        { id: 'open-drone-chests', title: 'Open Drone Chests', done: false },
      ] },
      { id: 'ar-drone-tue-2', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: wed.plus({ hours: 2 }), end: wed.plus({ hours: 6 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'stamina', title: 'Stamina', done: false },
      ] },
      { id: 'ar-hero-tue-2', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: wed.plus({ hours: 6 }), end: wed.plus({ hours: 10 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'ar-tech-wed-1', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: wed.plus({ hours: 10 }), end: wed.plus({ hours: 14 }), tasks: [
        { id: 'double-dip-inc-tech', title: 'DOUBLE DIP - Increase Tech Power', done: false },
        { id: 'double-dip-research', title: 'DOUBLE DIP - Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-base-wed-1', title: 'Arms Race: Base Building', color: COLORS.orange, start: wed.plus({ hours: 14 }), end: wed.plus({ hours: 18 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'construction-speedups', title: 'Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-unit-wed-1', title: 'Arms Race: Unit Progression', color: COLORS.green, start: wed.plus({ hours: 18 }), end: wed.plus({ hours: 22 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'training-speedups', title: 'Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-tech-wed-2', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: wed.plus({ hours: 22 }), end: thu.plus({ hours: 2 }), tasks: [
        { id: 'double-dip-inc-tech', title: 'DOUBLE DIP - Increase Tech Power', done: false },
        { id: 'double-dip-research', title: 'DOUBLE DIP - Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'vs-train-heroes', title: 'Alliance Versus: Train Heroes', color: COLORS.red, start: thu.plus({ hours: 2 }), end: fri.plus({ hours: 2 }), tasks: [
        { id: 'use-hero-shards', title: 'Use Hero Shards', done: false },
        { id: 'use-skill-medals', title: 'Use Skill Medals', done: false },
      ] },
      { id: 'ar-base-wed-2', title: 'Arms Race: Base Building', color: COLORS.orange, start: thu.plus({ hours: 2 }), end: thu.plus({ hours: 6 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'construction-speedups', title: 'Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-unit-wed-2', title: 'Arms Race: Unit Progression', color: COLORS.green, start: thu.plus({ hours: 6 }), end: thu.plus({ hours: 10 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'training-speedups', title: 'Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-hero-thu-1', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: thu.plus({ hours: 10 }), end: thu.plus({ hours: 14 }), tasks: [
        { id: 'double-dip-hero-tickets', title: 'DOUBLE DIP - Use Hero Recruitment Tickets', done: false },
        { id: 'double-dip-hero-exp', title: 'DOUBLE DIP - Use Hero EXP', done: false },
      ] },
      { id: 'ar-tech-thu-1', title: 'Arms Race: Tech Research', color: COLORS.darkBlue, start: thu.plus({ hours: 14 }), end: thu.plus({ hours: 18 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'research-speedups', title: 'Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-thu-1', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: thu.plus({ hours: 18 }), end: thu.plus({ hours: 22 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'stamina', title: 'Stamina', done: false },
      ] },
      { id: 'ar-hero-thu-2', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: thu.plus({ hours: 22 }), end: fri.plus({ hours: 2 }), tasks: [
        { id: 'double-dip-hero-tickets', title: 'DOUBLE DIP - Use Hero Recruitment Tickets', done: false },
        { id: 'double-dip-hero-exp', title: 'DOUBLE DIP - Use Hero EXP', done: false },
      ] },
      { id: 'vs-total-mobilization', title: 'Alliance Versus: Total Mobilization', color: COLORS.purple, start: fri.plus({ hours: 2 }), end: sat.plus({ hours: 2 }), tasks: [
        { id: 'radar-tasks', title: 'Do Radar Tasks', done: false },
        { id: 'fin-double-dip-inc-tech', title: 'Increase Tech Power (No more double dipping)', done: false, unlockMin: 240 },
        { id: 'fin-double-dip-research', title: 'Use Research/Generic Speed-ups (No more double dipping)', done: false, unlockMin: 240 },
        { id: 'fin-double-dip-inc-build', title: 'Increase Building Power (No more double dipping)', done: false, unlockMin: 1200 },
        { id: 'fin-double-dip-construction', title: 'Use Construction/Generic Speed-ups (No more double dipping)', done: false, unlockMin: 1200 },
      ] },
      { id: 'ar-tech-thu-2', title: 'Arms Race: Tech Research', color: COLORS.purple, start: fri.plus({ hours: 2 }), end: fri.plus({ hours: 6 }), tasks: [
        { id: 'double-dip-inc-tech', title: 'DOUBLE DIP - Increase Tech Power', done: false },
        { id: 'double-dip-research', title: 'DOUBLE DIP - Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-thu-2', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: fri.plus({ hours: 6 }), end: fri.plus({ hours: 10 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'stamina', title: 'Stamina', done: false },
      ] },
      { id: 'ar-unit-fri-1', title: 'Arms Race: Unit Progression', color: COLORS.purple, start: fri.plus({ hours: 10 }), end: fri.plus({ hours: 14 }), tasks: [
        { id: 'double-dip-train-units', title: 'DOUBLE DIP - Train Units', done: false },
        { id: 'double-dip-training-generic', title: 'DOUBLE DIP - Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-hero-fri-1', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: fri.plus({ hours: 14 }), end: fri.plus({ hours: 18 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'ar-base-fri-1', title: 'Arms Race: Base Building', color: COLORS.purple, start: fri.plus({ hours: 18 }), end: fri.plus({ hours: 22 }), tasks: [
        { id: 'double-dip-inc-build', title: 'DOUBLE DIP - Increase Building Power', done: false },
        { id: 'double-dip-construction', title: 'DOUBLE DIP - Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-unit-fri-2', title: 'Arms Race: Unit Progression', color: COLORS.purple, start: fri.plus({ hours: 22 }), end: sat.plus({ hours: 2 }), tasks: [
        { id: 'double-dip-train-units', title: 'DOUBLE DIP - Train Units', done: false },
        { id: 'double-dip-training-generic', title: 'DOUBLE DIP - Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'vs-enemy-buster', title: 'Alliance Versus: Enemy Buster', color: COLORS.white, start: sat.plus({ hours: 2 }), end: sun.plus({ hours: 2 }), tasks: [
        { id: 'healing-speedups', title: 'Use Healing/Generic Speed-ups', done: false },
        { id: 'ur-tasks', title: 'Do UR Tasks', done: false },
        { id: 'deploy-ur-trucks', title: 'Deploy UR Trucks', done: false },
        { id: 'fin-double-dip-training-generic', title: 'Use Training/Generic Speed-ups (No more double dipping)', done: false, unlockMin: 240 },
        { id: 'fin-double-dip-research', title: 'Use Research/Generic Speed-ups (No more double dipping)', done: false, unlockMin: 480 },
        { id: 'fin-double-dip-stamina-kill', title: 'Stamina (Kill Units) (No more double dipping)', done: false, unlockMin: 960 },
      ] },
      { id: 'ar-unit-fri-3', title: 'Arms Race: Unit Progression', color: COLORS.white, start: sat.plus({ hours: 2 }), end: sat.plus({ hours: 6 }), tasks: [
        { id: 'train-units', title: 'Train Units', done: false },
        { id: 'double-dip-training-generic', title: 'DOUBLE DIP - Use Training/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-tech-fri-2', title: 'Arms Race: Tech Research', color: COLORS.white, start: sat.plus({ hours: 6 }), end: sat.plus({ hours: 10 }), tasks: [
        { id: 'inc-tech-power', title: 'Increase Tech Power', done: false },
        { id: 'double-dip-research', title: 'DOUBLE DIP - Use Research/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-base-sat-1', title: 'Arms Race: Base Building', color: COLORS.white, start: sat.plus({ hours: 10 }), end: sat.plus({ hours: 14 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'double-dip-construction', title: 'DOUBLE DIP - Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-sat-1', title: 'Arms Race: Drone Boost', color: COLORS.white, start: sat.plus({ hours: 14 }), end: sat.plus({ hours: 18 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'double-dip-stamina-kill', title: 'DOUBLE DIP - Stamina (Kill Units)', done: false },
      ] },
      { id: 'ar-hero-sat-1', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: sat.plus({ hours: 18 }), end: sat.plus({ hours: 22 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
      { id: 'ar-base-sat-2', title: 'Arms Race: Base Building', color: COLORS.white, start: sat.plus({ hours: 22 }), end: sun.plus({ hours: 2 }), tasks: [
        { id: 'inc-build-power', title: 'Increase Building Power', done: false },
        { id: 'double-dip-construction', title: 'DOUBLE DIP - Use Construction/Generic Speed-ups', done: false },
      ] },
      { id: 'ar-drone-sat-2', title: 'Arms Race: Drone Boost', color: COLORS.lightBlue, start: sun.plus({ hours: 2 }), end: sun.plus({ hours: 6 }), tasks: [
        { id: 'drone-data', title: 'Drone Data', done: false },
        { id: 'stamina', title: 'Stamina', done: false },
      ] },
      { id: 'ar-hero-sat-2', title: 'Arms Race: Hero Advancement', color: COLORS.red, start: sun.plus({ hours: 6 }), end: sun.plus({ hours: 10 }), tasks: [
        { id: 'hero-tickets', title: 'Use Hero Recruitment Tickets', done: false },
        { id: 'use-hero-exp', title: 'Use Hero EXP', done: false },
      ] },
    ];
  }

  window.getEventsUTC = getEventsUTC;
})();
