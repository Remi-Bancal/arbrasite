import os
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "random string"
app.config["IMAGE_UPLOADS"] = os.path.join(basedir, "photos")
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG", "JPG", "PNG", "GIF"]
app.config["MAX_IMAGE_FILESIZE"] = 4 * 1024 * 1024

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)


def allowed_image(filename, filesize):
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1]
    if ext.upper() not in app.config["ALLOWED_IMAGE_EXTENSIONS"]:
        return False
    if int(filesize) > app.config["MAX_IMAGE_FILESIZE"]:
        return False
    return True


# Parasite Class/Model
class Parasite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    latin_name = db.Column(db.String(200), unique=True)
    rottenness = db.Column(db.Boolean)  # rouge ou blanche
    observations = db.relationship('Observation', back_populates='parasite')

    def __init__(self, name, latin_name, rottenness):
        self.name = name
        self.latin_name = latin_name
        self.rottenness = rottenness


# TreeEssence Class/Model
class TreeEssence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    latin_name = db.Column(db.String(200), unique=True)
    observations = db.relationship('Observation', back_populates='essence')

    def __init__(self, name, latin_name):
        self.name = name
        self.latin_name = latin_name


# Observation Class/Model
class Observation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String(100), nullable=True)
    date = db.Column(db.String(200), nullable=True)
    essence_id = db.Column(db.Integer, db.ForeignKey('tree_essence.id'), nullable=False)
    parasite_id = db.Column(db.Integer, db.ForeignKey('parasite.id'), nullable=False)
    photos = db.relationship('Photo', backref='observation')
    parasite = db.relationship('Parasite', back_populates='observations', lazy='subquery')
    essence = db.relationship('TreeEssence', back_populates='observations', lazy='subquery')

    def __init__(self, place, date, essence_id, parasite_id):
        self.place = place
        self.date = date
        self.essence_id = essence_id
        self.parasite_id = parasite_id


# Photo Class/Model
class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    observation_id = db.Column(db.Integer, db.ForeignKey('observation.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)

    def __init__(self, observation_id, filename):
        self.observation_id = observation_id
        self.filename = filename


# Parasite Schema
class ParasiteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'latin_name', 'rottenness')


# TreeEssence Schema
class TreeEssenceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'latin_name')


# Observation Schema
class ObservationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'essence_id', 'essence.name', 'essence.latin_name', 'place', 'date', 'parasite_id', 'parasite.name', 'parasite.latin_name')


# Photo Schema
class PhotoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'observation_id', 'filename')


# Init schema
parasite_schema = ParasiteSchema()
parasites_schema = ParasiteSchema(many=True)
tree_essence_schema = TreeEssenceSchema()
tree_essences_schema = TreeEssenceSchema(many=True)
observation_schema = ObservationSchema()
observations_schema = ObservationSchema(many=True)
photo_schema = PhotoSchema()
photos_schema = PhotoSchema(many=True)


# APIs

# Create a Parasite
@app.route('/parasite', methods=['POST'])
def add_parasite():
    name = request.json['name']
    latin_name = request.json['latin_name']
    rottenness = request.json['rottenness']
    new_parasite = Parasite(name, latin_name, rottenness)
    db.session.add(new_parasite)
    db.session.commit()
    return parasite_schema.jsonify(new_parasite)


# Read All Parasites
@app.route('/parasites', methods=['GET'])
def get_parasites():
    all_parasites = Parasite.query.all()
    result = parasites_schema.dump(all_parasites)
    return jsonify(result)


# Read parasite
@app.route('/parasite/<id>', methods=['GET'])
def get_parasite(id):
    parasite = Parasite.query.get(id)
    result = parasite_schema.dump(parasite)
    return jsonify(result)


# Update a Parasite
@app.route('/parasite/<id>', methods=['PUT'])
def update_parasite(id):
    parasite = Parasite.query.get(id)
    parasite.name = request.json['name']
    parasite.latin_name = request.json['latin_name']
    parasite.rottenness = request.json['rottenness']
    db.session.commit()
    return parasite_schema.jsonify(parasite)


# Delete Parasite
@app.route('/parasite/<id>', methods=['DELETE'])
def delete_parasite(id):
    parasite = Parasite.query.get(id)
    all_observations = Observation.query.filter_by(parasite_id=id).all()
    for observation in all_observations:
        delete_observation(observation.id)
    db.session.delete(parasite)
    db.session.commit()
    return parasite_schema.jsonify(parasite)


# Create a TreeEssence
@app.route('/tree_essence', methods=['POST'])
def add_tree_essence():
    name = request.json['name']
    latin_name = request.json['latin_name']
    new_tree_essence = TreeEssence(name, latin_name)
    db.session.add(new_tree_essence)
    db.session.commit()
    return tree_essence_schema.jsonify(new_tree_essence)


# Read All TreeEssences
@app.route('/tree_essences', methods=['GET'])
def get_tree_essences():
    all_tree_essences = TreeEssence.query.all()
    result = tree_essences_schema.dump(all_tree_essences)
    return jsonify(result)


# Update a TreeEssence
@app.route('/tree_essence/<id>', methods=['PUT'])
def update_tree_essence(id):
    tree_essence = TreeEssence.query.get(id)
    tree_essence.name = request.json['name']
    tree_essence.latin_name = request.json['latin_name']
    db.session.commit()
    return tree_essence_schema.jsonify(tree_essence)


# Delete TreeEssence
@app.route('/tree_essence/<id>', methods=['DELETE'])
def delete_tree_essence(id):
    tree_essence = TreeEssence.query.get(id)
    all_observations = Observation.query.filter_by(id=id).all()
    for observation in all_observations:
        delete_observation(observation.id)
    db.session.delete(tree_essence)
    db.session.commit()
    return tree_essence_schema.jsonify(tree_essence)


# Create a observation
@app.route('/observation', methods=['POST'])
def add_observation():
    essence_id = request.json['essence_id']
    parasite_id = request.json['parasite_id']
    date = request.json['date']
    place = request.json['place']
    new_observation = Observation(essence_id=essence_id, parasite_id=parasite_id, place=place, date=date)
    db.session.add(new_observation)
    db.session.commit()
    return observation_schema.jsonify(new_observation)


# Get All observations of parasite
@app.route('/observations/from_parasite/<parasite_id>', methods=['GET'])
def get_observations_from_parasite(parasite_id):
    all_observations = Observation.query.filter_by(parasite_id=parasite_id).all()
    result = observations_schema.dump(all_observations)
    return jsonify(result)


# Get All observations on tree essence
@app.route('/observations/from_essence/<essence_id>', methods=['GET'])
def get_observations_from_essence(essence_id):
    all_observations = Observation.query.filter_by(essence_id=essence_id).all()
    return observations_schema.jsonify(all_observations)


# Delete observation
@app.route('/observation/<id>', methods=['DELETE'])
def delete_observation(id):
    observation = Observation.query.get(id)
    all_photos = Photo.query.filter_by(observation_id=id).all()
    for photo in all_photos:
        delete_photo(photo.id)
    db.session.delete(observation)
    db.session.commit()
    return observation_schema.jsonify(observation)


# Create a photo
@app.route('/photo', methods=['POST'])
def add_photo():
    observation_id = request.form['observation_id']
    if not request.files:
        return None
    image = request.files["photo"]
    if image.filename == "" or not allowed_image(image.filename, request.headers['content-length']):
        return None

    filename = str(uuid.uuid4()) + "." + image.filename.rsplit(".", 1)[1]
    path = os.path.join(app.config["IMAGE_UPLOADS"], filename)
    image.save(path)

    new_photo = Photo(observation_id=observation_id, filename=filename)
    db.session.add(new_photo)
    db.session.commit()
    return photo_schema.jsonify(new_photo)


# Retrieve id and filename of photos from an observation
@app.route('/photos/<observation_id>', methods=['GET'])
def get_photos_of_observation(observation_id):
    all_photos = Photo.query.all()
    result = photos_schema.dump(all_photos)
    return jsonify(result)


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config["IMAGE_UPLOADS"], filename)


# Delete photo
@app.route('/photo/<id>', methods=['DELETE'])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    photo_path = os.path.join(app.config["IMAGE_UPLOADS"], photo.filename)
    if os.path.isfile(photo_path):
        os.remove(photo_path)
    return photo_schema.jsonify(photo)


# Run Server
if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
