namespace squadtd {
  export namespace Economy {
    export namespace Constants {
      export namespace Gas {
        export const maxUpgrades = 30;
        export const gasPerUpgrade = 15;
        export const costPerUpgrade = 50;
        export function totalCost(upgradeNum: number) {
          return upgradeNum * costPerUpgrade;
        }
      }

      export namespace Speed {
        export const maxUpgrades = 5;
        export const percentageBoost = 0.4;
        export const addedCostPerUpgrade = 60;
        export function totalCost(upgradeNum: number): number {
          return upgradeNum * addedCostPerUpgrade * totalCost(upgradeNum - 1);
        }
      }

      export namespace Begin {
        export const minerals = 200;
        export const gas = 30;
      }
    }
  }
}
