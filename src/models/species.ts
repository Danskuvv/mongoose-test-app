import mongoose, { Schema, Document, Model } from 'mongoose';
import { ICategory } from './category';
import { Polygon } from 'geojson';
//import { URL } from 'mongoose-type-url';


export interface ISpecies extends Document {
  species_name: string;
  image: string;
  category: mongoose.Types.ObjectId | ICategory;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface SpeciesModel extends Model<ISpecies> {
  findByArea(polygon: Polygon): Promise<ISpecies[]>;
}

const SpeciesSchema: Schema = new Schema({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  }
});

SpeciesSchema.statics.findByArea = function (polygon: Polygon): Promise<ISpecies[]> {
  return this.find({
    location: {
      $geoWithin: {
        $geometry: polygon
      }
    }
  }).exec();
};

export default mongoose.model<ISpecies, SpeciesModel>('Species', SpeciesSchema);
