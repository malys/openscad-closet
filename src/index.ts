import * as fs from 'fs';
import { cylinder, difference, union, cube } from 'scad-js';

const epaisseurPlacard = 50;
const tringlePos = epaisseurPlacard + 17;
const placardPos = epaisseurPlacard + 15;
const diametreTringle = 2;
const murPos = epaisseurPlacard * 1.5;

const placard = difference(
  cube([233, murPos + 1, 250], { center: false }),
  cube([180, murPos, 100], { center: false })
    .rotate(30, [0, 1, 0])
    .translate([86, -1, 250])
)
const colonne = union(
  cube([300, murPos, 300], { center: false })
    .translate([1, 0, 0]),
  cube([60, placardPos, 300], { center: false })
    .translate([-60, 0, 0])
)

const placardComplet = union(
  difference(
    colonne,
    placard
  ),
  cube([1, epaisseurPlacard, 250], { center: false })
    .translate([82, 0, 0]),
  cube([1, epaisseurPlacard, 250], { center: false })
    .translate([164, 0, 0])
)

const hTringle = 245
const lSupport = 8
const LSupport = 10
const support = union(
  cube([2, lSupport, 0.2], { center: false }),
  cube([2, 0.2, LSupport], { center: false })
)

const tringle = union(
  cylinder(86, diametreTringle / 2, { center: false })
    .rotate(90, [0, 1, 0])
    .translate([0, tringlePos, hTringle]),
  cylinder(166, diametreTringle / 2, { center: false })
    .rotate(120, [0, 1, 0])
    .translate([86, tringlePos, hTringle]),
  support
    .rotate(180, [1, 0, 0])
    .translate([80, tringlePos, 250]),
  support
    .rotate(180, [1, 0, 0])
    .translate([6, tringlePos, 250]),
  support
    .rotate(180, [1, 0, 0])
    .rotate(30, [0, 1, 0])
    .translate([92, tringlePos, 246]),
  support
    .rotate(180, [1, 0, 0])
    .rotate(30, [0, 1, 0])
    .translate([(233 - 6 - 92) / 2 + 92, tringlePos, 207]),
  support
    .rotate(180, [1, 0, 0])
    .rotate(30, [0, 1, 0])
    .translate([233 - 6, tringlePos, 168]),
)

let output = union(
  placardComplet.color("white"),
  tringle.color("black")
)

fs.writeFileSync('./dist/output.scad', output.serialize({ $fn: 100 }));
