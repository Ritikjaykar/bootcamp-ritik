console.log("\n Access Modifiers & Private Fields");
class Demo {
  public name = "public";
  protected role = "protected";
  private age = 25;
  #secret = "hidden";

  show() {
    console.log("Inside Demo.show():", this.name, this.role, this.age, this.#secret);
  }
}

const d = new Demo();
d.show();
