export class Comparators {
    public static compareById(toCompare:IModel){
       return Comparators.compareWithId(toCompare.getId());
    }

    public static compareWithId(id: number){
       return function (obj: IModel){
            return obj.getId() == id;
        }
    }
}