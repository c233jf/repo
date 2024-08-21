# 加密算法

## 对称密钥算法

**对称密钥算法**（**Symmetric-key algorithm**）也称**对称加密**、**私钥加密**、**共享密钥加密**。这类算法在加密和解密时使用相同的密钥，或者是使用两个可以简单地相互推算的密钥。

### 常见算法

- [DES](https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96)：分组式加密算法，以 64 位为分组对数据加密，加解密使用同一个算法
- [3DES](https://zh.wikipedia.org/wiki/3DES)：三重数据加密算法，对每个数据块应用三次 DES 加密算法
- [AES](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86)：高级加密标准算法，目前已被广泛应用

### 优点

- 效率高，速度比非对称加密快很多
- 算法简单
- 系统开销小
- 适合加密大量数据

### 缺点

- 安全性差，需要双方获取相同的密钥

## 公开密钥密码学

**公开密钥密码学**（**Public-key cryptography**）也称**非对称式密码学**（**Asymmetric cryptography**）或**非对称加密**。该类算法使用两个密钥，一个是公开密钥（可以公开），一个是私有密钥（不能公开，用户必须自行严格秘密保管，绝不透过任何途径向任何人提供，也不会透露给被信任的要通信的另一方）；公钥用作加密，私钥用作解密。使用公钥加密的数据只有对应的私钥才能解密。

基于这种特性，该类算法还能提供[数字签名](https://zh.wikipedia.org/wiki/%E6%95%B8%E4%BD%8D%E7%B0%BD%E7%AB%A0)的功能。

### 常见算法

- [RSA](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)：两个大素数相乘十分容易，但是想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥，可用于加密，也能用于签名。（应用场景： 由于 RSA 算法的加密解密速度要比对称算法速度慢很多，在实际应用中，通常数据本身的加密和解密使用对称加密算法(AES)。 用 RSA 算法加密并传输对称算法所需的密钥。）
- [DSA](https://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D%E7%AE%97%E6%B3%95)：数字签名算法，仅能用于签名，不能用于加解密

### 优点

- 安全性高

### 缺点

- 速度慢
- 系统开销大

## 参考

- [加密算法](https://leetcode.cn/leetbook/read/7-day-interview-qian-duan/dm6t2s/)
- [对称密钥加密](https://zh.wikipedia.org/wiki/%E5%B0%8D%E7%A8%B1%E5%AF%86%E9%91%B0%E5%8A%A0%E5%AF%86)
- [公开密钥加密](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)
