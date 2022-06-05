/* eslint-disable no-constant-condition */
/**
 * @author heart
 * @description 拒绝采样法
 * @Date 2022-06-05
 */
export class Solution {
  private readonly radius: number
  private readonly x_center: number
  private readonly y_center: number
  constructor(radius: number, x_center: number, y_center: number) {
    this.radius = radius
    this.x_center = x_center
    this.y_center = y_center
  }

  randPoint(): number[] {
    //TODO: 概率这样似乎不等 因为 r取值的问题 导致面积也不会等概率 使用拒绝采样法:
    // // x的平方 加 y的平方 一定小于 radius的平方
    // // x的去值为 [-radius,radius] y的去值为 x^2 + y^2 <= radius^2
    // // y = Math.sqrt(radius ** 2 - x ** 2)
    // const x = Math.random() * this.radius - Math.random() * this.radius

    // const y =
    //   Math.random() * Math.sqrt(this.radius ** 2 - x ** 2) - Math.random() * Math.sqrt(this.radius ** 2 - x ** 2)

    // return [x + this.x_center, y + this.y_center]

    while (true) {
      const x = Math.random() * (2 * this.radius) - this.radius
      const y = Math.random() * (2 * this.radius) - this.radius

      if (x ** 2 + y ** 2 <= this.radius * this.radius) {
        return [x + this.x_center, y + this.y_center]
      }
    }
  }

  powRadius(): number {
    return this.radius ** 2
  }

  // TODO: 等概率随机采样法
  randPoint2(): number[] {
    // x 直接取 平方 保证面积相等
    // 之后 取值的是夹脚 保证概率相等 因为 sin  cos 保证了 [-1 , 1]
    const x = Math.sqrt(Math.random() * this.powRadius())
    // y直接角度
    const y = Math.random() * 2 * Math.PI

    return [this.x_center + x * Math.cos(y), this.y_center + x * Math.sin(y)]
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(radius, x_center, y_center)
 * var param_1 = obj.randPoint()
 */
