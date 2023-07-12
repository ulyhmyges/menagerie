import {Picture} from "../classes";

/**
 * les 500 occupants des lieux.
 *
 * Pandas roux, panthères des neiges, oryx d’Arabie, orangs-outans, pythons,
 * tortues des Seychelles, flamants roses, kangourous arboricoles, calao rhinocéros…
 *
 * 146 espèces
 *
 * hébergés dans les "fabriques", petites cabanes en rondins, torchis et toits de chaume,
 * inspirées en 1802, à l’architecte Molinos, par la ferme de Marie-Antoinette à Versailles.
 *
 * Area:
 * espace arboré
 * la Grande volière (1888) Bird
 * le Vivarium (1926), Reptile
 * la Singerie (1936), Primate
 * la Fauverie, BigCat
 */
export interface Area {
    /**
     * (nom, description, images, type, capacité, durée, horaires d’ouverture, accès handicapé)
     */
    name: string;
    description: string;
    type: string;
    capaacity: number;
    openingTime: Date;
    closingTime: Date;
    dissabledAcces: boolean;
    images: Picture[];
    available: boolean;
}
