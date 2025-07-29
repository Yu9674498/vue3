// utils/idGenerator.js
class SnowflakeID {
  constructor() {
    // 2023-01-01 作为纪元起点
    this.epoch = 1672527600000n;

    // 各部分的位数配置
    this.workerIdBits = 5n;
    this.datacenterIdBits = 5n;
    this.sequenceBits = 12n;

    // 最大值计算
    this.maxWorkerId = (1n << this.workerIdBits) - 1n;
    this.maxDatacenterId = (1n << this.datacenterIdBits) - 1n;

    // 位移量
    this.workerIdShift = this.sequenceBits;
    this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
    this.timestampShift =
      this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

    this.sequence = 0n;
    this.lastTimestamp = -1n;

    // 从环境变量获取（Docker/K8s 部署时设置）
    this.workerId = BigInt(process.env.WORKER_ID || 1);
    this.datacenterId = BigInt(process.env.DATA_CENTER_ID || 1);

    // 验证参数
    if (this.workerId > this.maxWorkerId || this.workerId < 0n) {
      throw new Error(`Worker ID must be between 0 and ${this.maxWorkerId}`);
    }

    if (this.datacenterId > this.maxDatacenterId || this.datacenterId < 0n) {
      throw new Error(
        `Datacenter ID must be between 0 and ${this.maxDatacenterId}`
      );
    }
  }

  nextId() {
    let timestamp = BigInt(Date.now());

    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${
          this.lastTimestamp - timestamp
        } milliseconds`
      );
    }

    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & ((1n << this.sequenceBits) - 1n);
      if (this.sequence === 0n) {
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    return (
      ((timestamp - this.epoch) << this.timestampShift) |
      (this.datacenterId << this.datacenterIdShift) |
      (this.workerId << this.workerIdShift) |
      this.sequence
    ).toString();
  }

  waitNextMillis(lastTimestamp) {
    let timestamp = BigInt(Date.now());
    while (timestamp <= lastTimestamp) {
      timestamp = BigInt(Date.now());
    }
    return timestamp;
  }
}

// 单例模式导出
module.exports = new SnowflakeID();
