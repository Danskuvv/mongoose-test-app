import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISpecies } from './species';

export interface IAnimal extends Document {
  animal_name: string;
  birthdate: Date;
  species: mongoose.Types.ObjectId | ISpecies;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface AnimalModel extends Model<IAnimal> {
  findBySpecies(species: string): Promise<IAnimal[]>;
}

const AnimalSchema: Schema = new Schema({
  animal_name: {
    type: String,
    required: true,
    minlength: 2
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => value <= new Date(),
      message: 'Birthdate cannot be in the future'
    }
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
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

AnimalSchema.statics.findBySpecies = function (species: string): Promise<IAnimal[]> {
  return this.find({ species }).exec();
};


export default mongoose.model<IAnimal, AnimalModel>('Animal', AnimalSchema);
