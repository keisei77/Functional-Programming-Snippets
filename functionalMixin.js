function FunctionalMixin (behavior, sharedBehavior = {}) {
  const instanceKeys = Reflect.ownKeys(behavior)
  const sharedKeys = Reflect.ownKeys(sharedBehavior)
  const typeTag = Symbol('isA')

  function mixin (target) {
    for (let property of instanceKeys) {
      if (!target[property]) {
        Object.defineProperty(target, property, {
          value: behavior[property],
          writable: true
        })
      }
    }
    target[typeTag] = true
    return target
  }

  for (let property of sharedKeys) {
    Object.defineProperty(mixin, property, {
      value: sharedBehavior[property],
      enumerable: sharedBehavior.propertyIsEnumerable(property)
    })
  }
  Object.defineProperty(mixin, Symbol.hasInstance, {
    value: (instance) => !!instance[typeTag]
  })
  return mixin
}

// Multiple Inheritance
class Todo {
  constructor (name) {
    this.name = name || 'Untitled';
    this.done = false;
  }

  do () {
    this.done = true;
    return this;
  }

  undo () {
    this.done = false;
    return this;
  }

  toHTML () {
    return this.name; // highly insecure
  }
}

let Coloured = FunctionalMixin({
  setColourRGB ({r, g, b}) {
    this.colourCode = {r, g, b};
    return this;
  },

  getColourRGB () {
    return this.colourCode;
  }
});

let ColouredTodo = Coloured(class extends Todo {});

let yellow = {r: 'FF', g: 'FF', b: '00'},
    red    = {r: 'FF', g: '00', b: '00'},
    green  = {r: '00', g: 'FF', b: '00'},
    grey   = {r: '80', g: '80', b: '80'};

let oneDayInMilliseconds = 1000 * 60 * 60 * 24;

class TimeSensitiveTodo extends ColouredTodo {
  constructor (name, deadline) {
    super(name);
    this.deadline = deadline;
  }

  getColourRGB () {
    let slack = this.deadline - Date.now();

    if (this.done) {
      return grey;
    }
    else if (slack <= 0) {
      return red;
    }
    else if (slack <= oneDayInMilliseconds){
      return yellow;
    }
    else return green;
  }

  toHTML () {
    let rgb = this.getColourRGB();

    return `<span style="color: #${rgb.r}${rgb.g}${rgb.b};">${super.toHTML()}</s\
pan>`;
  }
}

let task = new TimeSensitiveTodo('Finish JavaScript Allongé', Date.now() + oneDayInMilliseconds);

task.toHTML()
  //=> <span style="color: #FFFF00;">Finish JavaScript Allongé</span>

class Todo {
  constructor (name) {
    this.name = name || 'Untitled'
    this.done = false
  }
  do () {
    this.done = true
    return this
  }
  undo () {
    this.done = false
    return this
  }
}

const Coloured = FunctionalMixin(
  {
    setColourRGB ({ r, g, b }) {
      this.colourCode = { r, g, b }
      return this
    },
    getColourRGB () {
      return this.colourCode
    }
  },
  {
    RED:   { r: 255, g: 0,   b: 0   },
    GREEN: { r: 0,   g: 255, b: 0   },
    BLUE:  { r: 0,   g: 0,   b: 255 },
  }
)

Coloured(Todo.prototype)

const urgent = new Todo("finish blog post")
urgent.setColourRGB(Coloured.RED)

urgent.getColourRGB()
  //=> {"r":255,"g":0,"b":0}

urgent instanceof Coloured
  //=> true
{} instanceof Coloured
  //=> false
