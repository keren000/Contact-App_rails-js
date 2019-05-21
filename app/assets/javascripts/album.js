// Object Constructor
class Album {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.phone = attributes.phone;
    this.email = attributes.email;
    this.address = attributes.address;
    this.avatar = attributes.avatar;
  }

  buildHtml() {
    return (
      <h4>
        <a href="albums/${this.id}">
          ${this.name} | ${this.phone} | Email: ${this.email} | Address: $
          {this.address}
        </a>
      </h4>
    );
  }
}
