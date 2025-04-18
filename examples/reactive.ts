// 简化版的响应式实现
function reactive(target: object) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      track(target, key) // 依赖收集
      return res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      trigger(target, key) // 触发更新
      return res
    }
  })
}

// 存储副作用函数的WeakMap
const targetMap = new WeakMap()

// 依赖收集
function track(target: object, key: string | symbol) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // 收集当前激活的副作用函数
  if (activeEffect) {
    dep.add(activeEffect)
  }
}

// 触发更新
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect()) // 执行收集的副作用函数
  }
}
