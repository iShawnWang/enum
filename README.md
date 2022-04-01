# Enum

Classed Based Enum implementation

**100% Typed **  
**Easy to Expand**  




# Background

Since Typescript Enum is really simple almost like a primary Data Type,  
There are eager for a Standard but also extendable Enum Type



Insprired By [Swift Language](https://developer.apple.com/swift/)  
SourceCode Highly Inspired By [Dr. Axel Rauschmayer : Enum Pattern](https://2ality.com/2020/01/enum-pattern.html)


# Installation

`npm install enum-expansion`



# Example

### 1. Declare Enum

```
export class TaskStatus extends Enum {
  static wip = new TaskStatus('1', 'WIP')
  static working = new TaskStatus('2', 'Working')
  static done = new TaskStatus('3', 'Done')
  static error = new TaskStatus('4', 'Error')
  static _ = TaskStatus.closeEnum()
  constructor(value: string, label: string) {
    super()
    this.value = value
    this.label = label
  }
}
```


### 2. Use Enum

  1. **convert value to enum instance** : const TaskStatus = TaskStatus.of<TaskStatus>(`1`)
  2. **get keys** : TaskStatus.keys
  3. **get values**: TaskStatus.values
  4. **get [{value, label}] options to render View** : const options = TaskStatus.options()
  5. **get Enum label** : TaskStatus.wip.label
  6. **get Enum Value** : TaskStatus.wip.value
  7. **compare** : if(someVar === TaskStatus.wip.value) { ... }



### 3. **Expand Enum**

Expand Props and Functions



```

export class TaskStatus extends Enum {
  static wip = new TaskStatus('1', 'WIP', '#ff00ff');
  static working = new TaskStatus('2', 'Working', '#ffffff');
  static done = new TaskStatus('3', 'Done', '#ffff00');
  static error = new TaskStatus('4', 'Error', '#000000');

  static _ = TaskStatus.closeEnum();

  public color!: string; // 1. Declare Expand Props

  // 2. Update constructor
  constructor(value: string, label: string, color: string) {
    super();
    this.value = value;
    this.label = label;
    this.color = color;
  }

  // 4. Decalre Expand Function
  public getIcon(){
    return {"wip": 'wip.png', 'error': 'error.png'}[this.label] || 'default.png'
  }

  public performAction(taskId: string){
      switch (this) {
        case TaskStatus.wip:
          return fetch(`/markDone`, {method: 'POST', body: JSON.stringify({id: taskId})})
        case TaskStatus.working:
          // ...logic
          break
        case TaskStatus.done:
          // ...logic
          break
        case TaskStatus.error:
          // ...logic
          break
        default:
          break
      }
  }
}

```