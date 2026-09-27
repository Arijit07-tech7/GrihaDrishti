import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  Info,
  Search,
  Sparkles,
  Building2,
  MapPin,
  Ruler,
  Home,
  Layers3,
  Bath,
  Car,
  Trees,
  CalendarDays,
} from "lucide-react";

const FEATURES = [
  {
    name: "Building Class",
    code: "MSSubClass",
    category: "Property Basics",
    icon: Building2,
    what: "A code that tells the system what type of dwelling or building it is.",
    input: "Enter the building class code used by the dataset.",
    example: "Example: 20, 30, 60, 70, 120",
    why: "Different building types have different layouts, sizes and historical price patterns.",
  },
  {
    name: "Zoning Classification",
    code: "MSZoning",
    category: "Property Basics",
    icon: Building2,
    what: "The zoning category of the property.",
    input: "Select the zoning category that applies to the property.",
    example: "Example: RL, RM, FV",
    why: "Zoning gives the model important information about the property's land-use context.",
  },
  {
    name: "Lot Frontage",
    code: "LotFrontage",
    category: "Land & Location",
    icon: Ruler,
    what: "The length of the property boundary facing the street.",
    input: "Enter the frontage in feet.",
    example: "Example: 70 ft",
    why: "Street-facing land dimensions help describe the size and configuration of the property.",
  },
  {
    name: "Lot Area",
    code: "LotArea",
    category: "Land & Location",
    icon: Ruler,
    what: "The total area of the land belonging to the property.",
    input: "Enter the total lot size in square feet.",
    example: "Example: 8450 sq ft",
    why: "Land size is an important physical characteristic used by the valuation model.",
  },
  {
    name: "Street Access",
    code: "Street",
    category: "Land & Location",
    icon: MapPin,
    what: "The type of road providing access to the property.",
    input: "Select the applicable road type.",
    example: "Example: Pave or Grvl",
    why: "Road access provides information about property accessibility and infrastructure.",
  },
  {
    name: "Alley Access",
    code: "Alley",
    category: "Land & Location",
    icon: MapPin,
    what: "Whether the property has access through an alley and what type.",
    input: "Select the alley type, or None if there is no alley.",
    example: "Example: None, Grvl, Pave",
    why: "Additional access characteristics help describe the property's layout.",
  },
  {
    name: "Lot Shape",
    code: "LotShape",
    category: "Land & Location",
    icon: Ruler,
    what: "The shape of the property land.",
    input: "Select the shape that most closely matches the property.",
    example: "Example: Regular, Slightly Irregular",
    why: "Lot shape can affect how easily the land can be used or developed.",
  },
  {
    name: "Land Contour",
    code: "LandContour",
    category: "Land & Location",
    icon: Ruler,
    what: "The general physical level or contour of the land.",
    input: "Select the terrain category.",
    example: "Example: Level, Bank, Hillside",
    why: "Terrain can influence usability, construction and property characteristics.",
  },
  {
    name: "Utilities",
    code: "Utilities",
    category: "Land & Location",
    icon: Home,
    what: "The major utilities available to the property.",
    input: "Select the applicable utility category.",
    example: "Example: AllPub",
    why: "Utility availability provides important infrastructure information.",
  },
  {
    name: "Lot Configuration",
    code: "LotConfig",
    category: "Land & Location",
    icon: MapPin,
    what: "How the property lot is positioned relative to roads and nearby land.",
    input: "Select the lot configuration.",
    example: "Example: Inside, Corner, Cul-de-sac",
    why: "Lot position can affect access, privacy and usability.",
  },
  {
    name: "Land Slope",
    code: "LandSlope",
    category: "Land & Location",
    icon: Ruler,
    what: "How steep the property land is.",
    input: "Select the appropriate slope category.",
    example: "Example: Gentle, Moderate, Severe",
    why: "Slope can affect construction, drainage and usable land.",
  },
  {
    name: "Neighborhood",
    code: "Neighborhood",
    category: "Land & Location",
    icon: MapPin,
    what: "The neighborhood where the property is located.",
    input: "Select the neighborhood represented in the dataset.",
    example: "Example: CollgCr, NAmes, NridgHt",
    why: "Location is one of the important signals the model learns from historical property prices.",
  },
  {
    name: "Condition 1",
    code: "Condition1",
    category: "Land & Location",
    icon: MapPin,
    what: "The property's primary surrounding or proximity condition.",
    input: "Select the applicable condition.",
    example: "Example: Normal",
    why: "Nearby roads, railways and surrounding conditions can affect the property's context.",
  },
  {
    name: "Condition 2",
    code: "Condition2",
    category: "Land & Location",
    icon: MapPin,
    what: "A secondary surrounding or proximity condition.",
    input: "Select it when an additional condition applies.",
    example: "Example: Normal",
    why: "It gives the model additional information about the property's surroundings.",
  },
  {
    name: "Building Type",
    code: "BldgType",
    category: "Property Basics",
    icon: Building2,
    what: "The general structural type of the dwelling.",
    input: "Select the building type.",
    example: "Example: 1Fam, Duplex, Twnhs",
    why: "Building configuration affects the property's layout and characteristics.",
  },
  {
    name: "House Style",
    code: "HouseStyle",
    category: "Property Basics",
    icon: Home,
    what: "The main architectural and floor arrangement of the house.",
    input: "Select the house style.",
    example: "Example: 1Story, 2Story",
    why: "House style provides information about the home's structure and usable space.",
  },
  {
    name: "Overall Quality",
    code: "OverallQual",
    category: "Quality & Construction",
    icon: Sparkles,
    what: "An overall rating of the property's material and finish quality.",
    input: "Enter a quality score from 1 to 10.",
    example: "Example: 7 = good overall quality",
    why: "Overall quality is an important signal in the historical price patterns learned by the model.",
  },
  {
    name: "Overall Condition",
    code: "OverallCond",
    category: "Quality & Construction",
    icon: Sparkles,
    what: "An overall rating of the property's present condition.",
    input: "Enter a condition score from 1 to 9.",
    example: "Example: 5",
    why: "Condition helps the model understand the current state of the property.",
  },
  {
    name: "Year Built",
    code: "YearBuilt",
    category: "Quality & Construction",
    icon: CalendarDays,
    what: "The year when the original house was constructed.",
    input: "Enter the four-digit construction year.",
    example: "Example: 2003",
    why: "Property age provides important context about the structure.",
  },
  {
    name: "Year Remodeled",
    code: "YearRemodAdd",
    category: "Quality & Construction",
    icon: CalendarDays,
    what: "The year of the property's most recent remodeling or addition.",
    input: "Enter the most recent remodeling year.",
    example: "Example: 2015",
    why: "A recently remodeled property may have different characteristics from an older untouched property.",
  },
  {
    name: "Roof Style",
    code: "RoofStyle",
    category: "Quality & Construction",
    icon: Home,
    what: "The architectural style of the roof.",
    input: "Select the roof style.",
    example: "Example: Gable, Hip",
    why: "Roof configuration helps describe the property's construction.",
  },
  {
    name: "Roof Material",
    code: "RoofMatl",
    category: "Quality & Construction",
    icon: Home,
    what: "The main material used on the roof.",
    input: "Select the roof material.",
    example: "Example: CompShg",
    why: "Roof material contributes to the property's construction and specification profile.",
  },
  {
    name: "Exterior Material 1",
    code: "Exterior1st",
    category: "Quality & Construction",
    icon: Building2,
    what: "The primary exterior covering material.",
    input: "Select the main exterior material.",
    example: "Example: VinylSd",
    why: "Exterior material helps describe construction and finish characteristics.",
  },
  {
    name: "Exterior Material 2",
    code: "Exterior2nd",
    category: "Quality & Construction",
    icon: Building2,
    what: "The secondary exterior covering material.",
    input: "Select the secondary material.",
    example: "Example: VinylSd",
    why: "Additional exterior material information helps the model distinguish property finishes.",
  },
  {
    name: "Masonry Veneer Type",
    code: "MasVnrType",
    category: "Quality & Construction",
    icon: Building2,
    what: "The type of masonry veneer used on the property.",
    input: "Select the veneer type or None.",
    example: "Example: BrkFace, Stone, None",
    why: "It provides additional information about exterior construction.",
  },
  {
    name: "Masonry Veneer Area",
    code: "MasVnrArea",
    category: "Quality & Construction",
    icon: Ruler,
    what: "The amount of exterior area covered by masonry veneer.",
    input: "Enter the area in square feet.",
    example: "Example: 196 sq ft",
    why: "It adds information about the property's exterior construction.",
  },
  {
    name: "Exterior Quality",
    code: "ExterQual",
    category: "Quality & Construction",
    icon: Sparkles,
    what: "The quality of the exterior materials and finish.",
    input: "Select the exterior quality level.",
    example: "Example: Ex, Gd, TA",
    why: "Exterior quality contributes to the property's overall construction profile.",
  },
  {
    name: "Exterior Condition",
    code: "ExterCond",
    category: "Quality & Construction",
    icon: Sparkles,
    what: "The current condition of the exterior materials.",
    input: "Select the exterior condition.",
    example: "Example: Ex, Gd, TA",
    why: "Condition helps the model distinguish properties with different maintenance states.",
  },
  {
    name: "Foundation",
    code: "Foundation",
    category: "Quality & Construction",
    icon: Building2,
    what: "The structural foundation type.",
    input: "Select the foundation type.",
    example: "Example: PConc, CBlock",
    why: "Foundation type provides structural information about the property.",
  },
  {
    name: "Basement Quality",
    code: "BsmtQual",
    category: "Basement",
    icon: Layers3,
    what: "The quality of the basement.",
    input: "Select the basement quality, or None if there is no basement.",
    example: "Example: Ex, Gd, TA, None",
    why: "Basement quality helps describe the usefulness and condition of lower-level space.",
  },
  {
    name: "Basement Condition",
    code: "BsmtCond",
    category: "Basement",
    icon: Layers3,
    what: "The current condition of the basement.",
    input: "Select the basement condition or None.",
    example: "Example: TA, Gd, None",
    why: "Basement condition provides additional information about usable property space.",
  },
  {
    name: "Basement Exposure",
    code: "BsmtExposure",
    category: "Basement",
    icon: Layers3,
    what: "How much exterior exposure or walkout access the basement has.",
    input: "Select the applicable exposure level.",
    example: "Example: Gd, Av, Mn, No",
    why: "Basement exposure can affect natural light, access and usability.",
  },
  {
    name: "Basement Finish Type 1",
    code: "BsmtFinType1",
    category: "Basement",
    icon: Layers3,
    what: "The finish level of the main finished basement area.",
    input: "Select the finish category or None.",
    example: "Example: GLQ, ALQ, Unf",
    why: "Finished basement space provides additional usable area.",
  },
  {
    name: "Finished Basement Area 1",
    code: "BsmtFinSF1",
    category: "Basement",
    icon: Ruler,
    what: "The finished area of the first basement section.",
    input: "Enter the area in square feet.",
    example: "Example: 706 sq ft",
    why: "Finished area helps the model understand usable property space.",
  },
  {
    name: "Basement Finish Type 2",
    code: "BsmtFinType2",
    category: "Basement",
    icon: Layers3,
    what: "The finish level of a second basement area.",
    input: "Select the finish category or None.",
    example: "Example: Unf, Rec, None",
    why: "It provides additional information about finished basement space.",
  },
  {
    name: "Finished Basement Area 2",
    code: "BsmtFinSF2",
    category: "Basement",
    icon: Ruler,
    what: "The finished area associated with the second basement section.",
    input: "Enter the area in square feet.",
    example: "Example: 0 sq ft",
    why: "It helps distinguish different types of basement space.",
  },
  {
    name: "Unfinished Basement Area",
    code: "BsmtUnfSF",
    category: "Basement",
    icon: Ruler,
    what: "The unfinished area of the basement.",
    input: "Enter the unfinished basement area in square feet.",
    example: "Example: 150 sq ft",
    why: "The model uses this to distinguish finished and unfinished lower-level space.",
  },
  {
    name: "Total Basement Area",
    code: "TotalBsmtSF",
    category: "Basement",
    icon: Ruler,
    what: "The complete basement area.",
    input: "Enter total basement area in square feet.",
    example: "Example: 856 sq ft",
    why: "Total basement size is an important physical property characteristic.",
  },
  {
    name: "Heating Type",
    code: "Heating",
    category: "Utilities & Interior",
    icon: Home,
    what: "The primary heating system used by the property.",
    input: "Select the heating system.",
    example: "Example: GasA",
    why: "Heating type provides information about property infrastructure.",
  },
  {
    name: "Heating Quality",
    code: "HeatingQC",
    category: "Utilities & Interior",
    icon: Sparkles,
    what: "The quality and condition of the heating system.",
    input: "Select the heating quality.",
    example: "Example: Ex, Gd, TA",
    why: "Heating quality adds information about the property's systems and condition.",
  },
  {
    name: "Central Air",
    code: "CentralAir",
    category: "Utilities & Interior",
    icon: Home,
    what: "Whether the property has central air conditioning.",
    input: "Choose Yes or No.",
    example: "Example: Y",
    why: "Central air is an important property infrastructure and amenity characteristic.",
  },
  {
    name: "Electrical System",
    code: "Electrical",
    category: "Utilities & Interior",
    icon: Home,
    what: "The type of electrical system installed in the property.",
    input: "Select the electrical system category.",
    example: "Example: SBrkr",
    why: "Electrical infrastructure provides additional property specification information.",
  },
  {
    name: "First Floor Area",
    code: "1stFlrSF",
    category: "Utilities & Interior",
    icon: Ruler,
    what: "The finished area of the first floor.",
    input: "Enter first-floor area in square feet.",
    example: "Example: 856 sq ft",
    why: "First-floor area helps describe the size and usable space of the property.",
  },
  {
    name: "Second Floor Area",
    code: "2ndFlrSF",
    category: "Utilities & Interior",
    icon: Ruler,
    what: "The finished area of the second floor.",
    input: "Enter second-floor area in square feet.",
    example: "Example: 854 sq ft",
    why: "It provides information about additional usable living space.",
  },
  {
    name: "Low Quality Finished Area",
    code: "LowQualFinSF",
    category: "Utilities & Interior",
    icon: Ruler,
    what: "Finished area that is considered lower quality than standard living space.",
    input: "Enter the area in square feet.",
    example: "Example: 0 sq ft",
    why: "The model separates this from standard living area to understand the quality of finished space.",
  },
  {
    name: "Above-Ground Living Area",
    code: "GrLivArea",
    category: "Utilities & Interior",
    icon: Home,
    what: "The finished living area above ground level.",
    input: "Enter the above-ground living area in square feet.",
    example: "Example: 1710 sq ft",
    why: "Living area is a major physical characteristic used by the model when estimating historical property prices.",
  },
  {
    name: "Basement Full Bathrooms",
    code: "BsmtFullBath",
    category: "Utilities & Interior",
    icon: Bath,
    what: "The number of full bathrooms located in the basement.",
    input: "Enter the number of basement full bathrooms.",
    example: "Example: 1",
    why: "Bathroom availability helps describe the functionality of the property.",
  },
  {
    name: "Basement Half Bathrooms",
    code: "BsmtHalfBath",
    category: "Utilities & Interior",
    icon: Bath,
    what: "The number of half bathrooms in the basement.",
    input: "Enter the number of basement half bathrooms.",
    example: "Example: 0",
    why: "It provides additional information about the home's facilities.",
  },
  {
    name: "Full Bathrooms",
    code: "FullBath",
    category: "Utilities & Interior",
    icon: Bath,
    what: "The number of full bathrooms above ground.",
    input: "Enter the total number of full bathrooms.",
    example: "Example: 2",
    why: "Bathroom count helps describe the functionality and capacity of the home.",
  },
  {
    name: "Half Bathrooms",
    code: "HalfBath",
    category: "Utilities & Interior",
    icon: Bath,
    what: "The number of half bathrooms above ground.",
    input: "Enter the total number of half bathrooms.",
    example: "Example: 1",
    why: "Additional bathroom facilities provide useful information about the layout.",
  },
  {
    name: "Bedrooms Above Ground",
    code: "BedroomAbvGr",
    category: "Utilities & Interior",
    icon: Home,
    what: "The number of bedrooms above ground.",
    input: "Enter the number of bedrooms.",
    example: "Example: 3",
    why: "Bedroom count describes the capacity and layout of the property.",
  },
  {
    name: "Kitchens Above Ground",
    code: "KitchenAbvGr",
    category: "Utilities & Interior",
    icon: Home,
    what: "The number of kitchens above ground.",
    input: "Enter the number of kitchens.",
    example: "Example: 1",
    why: "Kitchen count helps describe the property's configuration.",
  },
  {
    name: "Kitchen Quality",
    code: "KitchenQual",
    category: "Utilities & Interior",
    icon: Sparkles,
    what: "The quality of the kitchen materials and finish.",
    input: "Select the kitchen quality.",
    example: "Example: Ex, Gd, TA",
    why: "Kitchen quality provides a useful signal about the property's finish level.",
  },
  {
    name: "Total Rooms Above Ground",
    code: "TotRmsAbvGrd",
    category: "Utilities & Interior",
    icon: Home,
    what: "The total number of rooms above ground, excluding bathrooms.",
    input: "Enter the total room count.",
    example: "Example: 8 rooms",
    why: "Room count provides information about the home's size and layout.",
  },
  {
    name: "Home Functionality",
    code: "Functional",
    category: "Utilities & Interior",
    icon: Home,
    what: "The overall functional condition of the home.",
    input: "Select the functionality category.",
    example: "Example: Typ",
    why: "Functionality helps the model understand how usable the property is.",
  },
  {
    name: "Fireplaces",
    code: "Fireplaces",
    category: "Fireplace & Garage",
    icon: Home,
    what: "The number of fireplaces in the property.",
    input: "Enter the number of fireplaces.",
    example: "Example: 0, 1, 2",
    why: "Fireplaces are an additional amenity characteristic.",
  },
  {
    name: "Fireplace Quality",
    code: "FireplaceQu",
    category: "Fireplace & Garage",
    icon: Sparkles,
    what: "The quality of the property's fireplace.",
    input: "Select the quality or None.",
    example: "Example: Ex, Gd, None",
    why: "It provides more detail about the property's fireplace amenity.",
  },
  {
    name: "Garage Type",
    code: "GarageType",
    category: "Fireplace & Garage",
    icon: Car,
    what: "The type and configuration of the garage.",
    input: "Select the garage type or None.",
    example: "Example: Attchd, Detchd",
    why: "Garage configuration is an important property amenity.",
  },
  {
    name: "Garage Year Built",
    code: "GarageYrBlt",
    category: "Fireplace & Garage",
    icon: CalendarDays,
    what: "The year when the garage was built.",
    input: "Enter the four-digit garage construction year.",
    example: "Example: 2003",
    why: "Garage age adds information about the property's accessory structure.",
  },
  {
    name: "Garage Finish",
    code: "GarageFinish",
    category: "Fireplace & Garage",
    icon: Car,
    what: "The interior finish level of the garage.",
    input: "Select the garage finish.",
    example: "Example: Fin, RFn, Unf",
    why: "Garage finish helps describe the quality and usability of the garage.",
  },
  {
    name: "Garage Capacity",
    code: "GarageCars",
    category: "Fireplace & Garage",
    icon: Car,
    what: "How many cars the garage can accommodate.",
    input: "Enter the number of car spaces.",
    example: "Example: 2 cars",
    why: "Garage capacity is a useful indicator of property utility and amenities.",
  },
  {
    name: "Garage Area",
    code: "GarageArea",
    category: "Fireplace & Garage",
    icon: Ruler,
    what: "The total area of the garage.",
    input: "Enter garage area in square feet.",
    example: "Example: 548 sq ft",
    why: "Garage size adds information about accessory space.",
  },
  {
    name: "Garage Quality",
    code: "GarageQual",
    category: "Fireplace & Garage",
    icon: Sparkles,
    what: "The quality of the garage.",
    input: "Select the quality or None.",
    example: "Example: TA, Gd, None",
    why: "Garage quality helps describe the property's accessory structure.",
  },
  {
    name: "Garage Condition",
    code: "GarageCond",
    category: "Fireplace & Garage",
    icon: Sparkles,
    what: "The current condition of the garage.",
    input: "Select the condition or None.",
    example: "Example: TA, Gd, None",
    why: "Garage condition gives the model additional information about property condition.",
  },
  {
    name: "Paved Driveway",
    code: "PavedDrive",
    category: "Fireplace & Garage",
    icon: Car,
    what: "The paving condition of the driveway.",
    input: "Select the driveway category.",
    example: "Example: Y, P, N",
    why: "Driveway condition adds information about property access and infrastructure.",
  },
  {
    name: "Wood Deck Area",
    code: "WoodDeckSF",
    category: "Outdoor Features",
    icon: Trees,
    what: "The area of the property's wood deck.",
    input: "Enter deck area in square feet.",
    example: "Example: 120 sq ft",
    why: "Outdoor living space contributes to the property's amenity profile.",
  },
  {
    name: "Open Porch Area",
    code: "OpenPorchSF",
    category: "Outdoor Features",
    icon: Trees,
    what: "The area of open porch space.",
    input: "Enter porch area in square feet.",
    example: "Example: 61 sq ft",
    why: "Porch space provides additional information about outdoor usability.",
  },
  {
    name: "Enclosed Porch Area",
    code: "EnclosedPorch",
    category: "Outdoor Features",
    icon: Trees,
    what: "The area of enclosed porch space.",
    input: "Enter enclosed porch area in square feet.",
    example: "Example: 0 sq ft",
    why: "It helps describe additional usable or auxiliary space.",
  },
  {
    name: "Three-Season Porch",
    code: "3SsnPorch",
    category: "Outdoor Features",
    icon: Trees,
    what: "The area of a three-season porch.",
    input: "Enter the area in square feet.",
    example: "Example: 0 sq ft",
    why: "Additional porch space contributes to the property's amenity profile.",
  },
  {
    name: "Screen Porch Area",
    code: "ScreenPorch",
    category: "Outdoor Features",
    icon: Trees,
    what: "The area of screened porch space.",
    input: "Enter the area in square feet.",
    example: "Example: 0 sq ft",
    why: "Screened outdoor space provides additional property information.",
  },
  {
    name: "Pool Area",
    code: "PoolArea",
    category: "Outdoor Features",
    icon: Trees,
    what: "The surface area of the property's pool.",
    input: "Enter pool area in square feet. Use 0 if there is no pool.",
    example: "Example: 0 sq ft",
    why: "Pool availability and size contribute to the property's amenity profile.",
  },
  {
    name: "Pool Quality",
    code: "PoolQC",
    category: "Outdoor Features",
    icon: Sparkles,
    what: "The quality of the property's pool.",
    input: "Select the quality or None.",
    example: "Example: Ex, Gd, None",
    why: "Pool quality adds detail about a property's amenities.",
  },
  {
    name: "Fence",
    code: "Fence",
    category: "Outdoor Features",
    icon: Trees,
    what: "The type or quality of fencing around the property.",
    input: "Select the fence category or None.",
    example: "Example: GdPrv, MnPrv, None",
    why: "Fencing provides additional information about the property's exterior.",
  },
  {
    name: "Miscellaneous Feature",
    code: "MiscFeature",
    category: "Outdoor Features",
    icon: Trees,
    what: "An additional property feature not covered by the main categories.",
    input: "Select the applicable feature or None.",
    example: "Example: Shed, Gar2, None",
    why: "Unusual additional features can help distinguish one property from another.",
  },
  {
    name: "Miscellaneous Value",
    code: "MiscVal",
    category: "Outdoor Features",
    icon: Ruler,
    what: "The value associated with the miscellaneous property feature.",
    input: "Enter the applicable value. Use 0 when there is no miscellaneous feature.",
    example: "Example: 0",
    why: "This provides additional context about miscellaneous property characteristics.",
  },
  {
    name: "Month Sold",
    code: "MoSold",
    category: "Sale Information",
    icon: CalendarDays,
    what: "The month in which the property was sold.",
    input: "Enter a month from 1 to 12.",
    example: "Example: 6 = June",
    why: "Sale month provides historical transaction timing information.",
  },
  {
    name: "Year Sold",
    code: "YrSold",
    category: "Sale Information",
    icon: CalendarDays,
    what: "The year in which the property was sold.",
    input: "Enter the four-digit sale year.",
    example: "Example: 2008",
    why: "Sale year provides time context for the historical SalePrice.",
  },
  {
    name: "Sale Type",
    code: "SaleType",
    category: "Sale Information",
    icon: Home,
    what: "The type of property transaction.",
    input: "Select the applicable sale type.",
    example: "Example: WD, New, COD",
    why: "Transaction type provides context about the historical sale.",
  },
  {
    name: "Sale Condition",
    code: "SaleCondition",
    category: "Sale Information",
    icon: Home,
    what: "The circumstances or condition under which the property was sold.",
    input: "Select the applicable sale condition.",
    example: "Example: Normal, Partial",
    why: "Sale circumstances can affect the recorded historical transaction price.",
  },
];

const CATEGORIES = [
  "All",
  "Property Basics",
  "Land & Location",
  "Quality & Construction",
  "Basement",
  "Utilities & Interior",
  "Fireplace & Garage",
  "Outdoor Features",
  "Sale Information",
];

export default function MarketInsights({ onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openFeature, setOpenFeature] = useState(null);

  const filteredFeatures = useMemo(() => {
    const query = search.trim().toLowerCase();

    return FEATURES.filter((feature) => {
      const matchesCategory =
        category === "All" || feature.category === category;

      const matchesSearch =
        !query ||
        feature.name.toLowerCase().includes(query) ||
        feature.code.toLowerCase().includes(query) ||
        feature.what.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const toggleFeature = (code) => {
    setOpenFeature((current) => (current === code ? null : code));
  };

  return (
    <div className="market-insights-page">
      <div className="market-bg-grid" />

      <header className="market-header">
        <div className="market-brand">
          <div className="market-brand-icon">
            <Sparkles size={21} />
          </div>

          <div>
            <strong>GrihaDrishti</strong>
            <span>AI Property Intelligence</span>
          </div>
        </div>

        <button className="market-back" onClick={onBack}>
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>
      </header>

      <main className="market-container">
        <motion.div
          className="market-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="market-pill">
            <Info size={14} />
            Property Feature Guide
          </div>

          <h1>
            Understand Your
            <span> Property Data</span>
          </h1>

          <p>
            Not sure what an input means? This guide explains every feature
            used by GrihaDrishti in simple language — including what to enter,
            examples, and why the information matters for property valuation.
          </p>

          <div className="market-stats">
            <div>
              <strong>{FEATURES.length}</strong>
              <span>Features Explained</span>
            </div>

            <div>
              <strong>8</strong>
              <span>Property Categories</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Historical Price Intelligence</span>
            </div>
          </div>
        </motion.div>

        <div className="market-note">
          <Sparkles size={18} />

          <div>
            <strong>How to use this page</strong>
            <p>
              Find the feature you see on the Prediction page, open it, and
              read the simple explanation. You can then return to the
              Prediction page and enter the appropriate value.
            </p>
          </div>
        </div>

        <div className="market-toolbar">
          <div className="market-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search a feature... e.g. OverallQual"
            />
          </div>

          <div className="market-filters">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="market-results">
          <div className="results-heading">
            <div>
              <span>FEATURE GUIDE</span>
              <h2>
                {filteredFeatures.length} feature
                {filteredFeatures.length !== 1 ? "s" : ""}
              </h2>
            </div>

            <p>Click any feature to learn what value to enter.</p>
          </div>

          <div className="feature-list">
            {filteredFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isOpen = openFeature === feature.code;

              return (
                <motion.div
                  key={feature.code}
                  className={`insight-card ${isOpen ? "open" : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.015, 0.25) }}
                >
                  <button
                    className="insight-card-header"
                    onClick={() => toggleFeature(feature.code)}
                  >
                    <div className="feature-main">
                      <div className="feature-icon">
                        <Icon size={18} />
                      </div>

                      <div>
                        <h3>{feature.name}</h3>
                        <span>{feature.code}</span>
                      </div>
                    </div>

                    <div className="feature-right">
                      <small>{feature.category}</small>
                      <ChevronDown
                        size={18}
                        className={isOpen ? "rotate" : ""}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="insight-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="explanation-grid">
                          <div className="explanation-box">
                            <span>WHAT IS THIS?</span>
                            <p>{feature.what}</p>
                          </div>

                          <div className="explanation-box input-box">
                            <span>WHAT SHOULD I ENTER?</span>
                            <p>{feature.input}</p>
                          </div>

                          <div className="explanation-box example-box">
                            <span>EXAMPLE</span>
                            <p>{feature.example}</p>
                          </div>

                          <div className="explanation-box value-box">
                            <span>WHY DOES IT MATTER?</span>
                            <p>{feature.why}</p>
                          </div>
                        </div>

                        <div className="customer-tip">
                          <Sparkles size={14} />
                          <div>
                            <strong>Simple tip</strong>
                            <p>
                              Enter the value that best matches the actual
                              property. If you don't know this information,
                              check the property's documents, listing details,
                              or ask the property owner/agent.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {filteredFeatures.length === 0 && (
            <div className="no-results">
              <Search size={28} />
              <h3>No feature found</h3>
              <p>Try searching with another feature name or code.</p>
            </div>
          )}
        </div>

        <div className="market-disclaimer">
          <Info size={17} />

          <p>
            <strong>About the valuation model:</strong> GrihaDrishti uses the
            Ames Housing / House Prices dataset. The relationships described
            here refer to patterns available in that historical dataset.
            They should not be interpreted as live market prices or guaranteed
            price effects for a property in Kolkata, India.
          </p>
        </div>
      </main>

      <style>{`
        .market-insights-page {
          min-height: 100vh;
          color: #f8fafc;
          background:
            radial-gradient(circle at 8% 5%, rgba(124,58,237,.14), transparent 28%),
            radial-gradient(circle at 92% 25%, rgba(37,99,235,.12), transparent 28%),
            #05060b;
          position: relative;
          overflow-x: hidden;
        }

        .market-bg-grid {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .3;
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .market-header {
          position: sticky;
          top: 0;
          z-index: 20;
          height: 74px;
          padding: 0 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(5,6,11,.82);
          border-bottom: 1px solid rgba(255,255,255,.07);
          backdrop-filter: blur(22px);
        }

        .market-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .market-brand-icon {
          width: 41px;
          height: 41px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: #ddd6fe;
          background: linear-gradient(135deg,#7c3aed,#2563eb);
        }

        .market-brand strong {
          display: block;
          font-size: 16px;
        }

        .market-brand span {
          display: block;
          margin-top: 2px;
          color: #64748b;
          font-size: 10px;
        }

        .market-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          color: #cbd5e1;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 11px;
          background: rgba(255,255,255,.04);
          cursor: pointer;
        }

        .market-container {
          position: relative;
          z-index: 1;
          width: min(1150px,92%);
          margin: auto;
          padding: 55px 0 80px;
        }

        .market-hero {
          max-width: 850px;
        }

        .market-pill {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 11px;
          color: #c4b5fd;
          border: 1px solid rgba(139,92,246,.25);
          border-radius: 999px;
          background: rgba(124,58,237,.08);
          font-size: 11px;
          font-weight: 700;
        }

        .market-hero h1 {
          margin: 18px 0 13px;
          font-size: clamp(40px,6vw,64px);
          line-height: 1;
          letter-spacing: -.055em;
        }

        .market-hero h1 span {
          display: block;
          color: #a78bfa;
        }

        .market-hero > p {
          max-width: 760px;
          color: #94a3b8;
          line-height: 1.75;
          font-size: 14px;
        }

        .market-stats {
          display: flex;
          gap: 10px;
          margin-top: 27px;
        }

        .market-stats > div {
          min-width: 145px;
          padding: 15px 18px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px;
          background: rgba(255,255,255,.035);
        }

        .market-stats strong {
          display: block;
          color: #c4b5fd;
          font-size: 21px;
        }

        .market-stats span {
          color: #64748b;
          font-size: 10px;
        }

        .market-note {
          display: flex;
          gap: 13px;
          margin: 30px 0 22px;
          padding: 17px;
          border: 1px solid rgba(6,182,212,.13);
          border-radius: 16px;
          background: rgba(6,182,212,.035);
        }

        .market-note > svg {
          flex-shrink: 0;
          color: #67e8f9;
          margin-top: 2px;
        }

        .market-note strong {
          font-size: 13px;
        }

        .market-note p {
          margin: 5px 0 0;
          color: #94a3b8;
          font-size: 11px;
          line-height: 1.6;
        }

        .market-toolbar {
          position: sticky;
          top: 90px;
          z-index: 10;
          padding: 12px;
          margin-bottom: 30px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          background: rgba(8,9,15,.82);
          backdrop-filter: blur(18px);
        }

        .market-search {
          height: 43px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 13px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 11px;
          background: rgba(255,255,255,.035);
        }

        .market-search svg {
          color: #64748b;
        }

        .market-search input {
          width: 100%;
          border: 0;
          outline: 0;
          color: white;
          background: transparent;
          font-size: 12px;
        }

        .market-search input::placeholder {
          color: #475569;
        }

        .market-filters {
          display: flex;
          gap: 7px;
          margin-top: 10px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .market-filters::-webkit-scrollbar {
          display: none;
        }

        .market-filters button {
          flex-shrink: 0;
          padding: 7px 11px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 9px;
          color: #64748b;
          background: rgba(255,255,255,.025);
          cursor: pointer;
          font-size: 10px;
        }

        .market-filters button.active {
          color: white;
          border-color: rgba(139,92,246,.35);
          background: rgba(124,58,237,.18);
        }

        .results-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .results-heading span {
          color: #8b5cf6;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .12em;
        }

        .results-heading h2 {
          margin: 4px 0 0;
          font-size: 21px;
        }

        .results-heading p {
          margin: 0;
          color: #64748b;
          font-size: 11px;
        }

        .feature-list {
          display: grid;
          gap: 9px;
        }

        .insight-card {
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 15px;
          background: rgba(255,255,255,.028);
          transition: .2s ease;
        }

        .insight-card.open {
          border-color: rgba(139,92,246,.24);
          background: rgba(124,58,237,.035);
        }

        .insight-card-header {
          width: 100%;
          padding: 15px 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 0;
          color: white;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .feature-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 10px;
          color: #a78bfa;
          background: rgba(124,58,237,.1);
        }

        .feature-main h3 {
          margin: 0;
          font-size: 13px;
        }

        .feature-main span {
          display: block;
          margin-top: 3px;
          color: #64748b;
          font-family: monospace;
          font-size: 10px;
        }

        .feature-right {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #64748b;
        }

        .feature-right small {
          padding: 5px 8px;
          border-radius: 7px;
          background: rgba(255,255,255,.04);
          font-size: 9px;
        }

        .feature-right svg {
          transition: .2s ease;
        }

        .feature-right svg.rotate {
          transform: rotate(180deg);
          color: #a78bfa;
        }

        .insight-content {
          overflow: hidden;
          padding: 0 17px 17px;
        }

        .explanation-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 9px;
        }

        .explanation-box {
          padding: 13px;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 11px;
          background: rgba(0,0,0,.16);
        }

        .explanation-box span {
          display: block;
          margin-bottom: 6px;
          color: #64748b;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: .08em;
        }

        .explanation-box p {
          margin: 0;
          color: #cbd5e1;
          font-size: 11px;
          line-height: 1.6;
        }

        .input-box {
          border-color: rgba(139,92,246,.13);
        }

        .input-box span {
          color: #a78bfa;
        }

        .example-box span {
          color: #67e8f9;
        }

        .value-box span {
          color: #86efac;
        }

        .customer-tip {
          display: flex;
          gap: 9px;
          margin-top: 9px;
          padding: 11px;
          border-radius: 10px;
          background: rgba(255,255,255,.025);
        }

        .customer-tip > svg {
          flex-shrink: 0;
          color: #fbbf24;
          margin-top: 2px;
        }

        .customer-tip strong {
          font-size: 10px;
          color: #fbbf24;
        }

        .customer-tip p {
          margin: 3px 0 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .no-results {
          padding: 60px 20px;
          text-align: center;
          border: 1px dashed rgba(255,255,255,.1);
          border-radius: 18px;
        }

        .no-results svg {
          color: #64748b;
        }

        .no-results h3 {
          margin: 12px 0 5px;
        }

        .no-results p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        .market-disclaimer {
          display: flex;
          gap: 10px;
          margin-top: 25px;
          padding: 15px;
          color: #94a3b8;
          border: 1px solid rgba(245,158,11,.12);
          border-radius: 13px;
          background: rgba(245,158,11,.025);
        }

        .market-disclaimer svg {
          flex-shrink: 0;
          color: #fbbf24;
          margin-top: 2px;
        }

        .market-disclaimer p {
          margin: 0;
          font-size: 10px;
          line-height: 1.6;
        }

        .market-disclaimer strong {
          color: #fbbf24;
        }

        @media(max-width:700px) {
          .market-header {
            padding: 0 4%;
          }

          .market-back {
            font-size: 0;
            padding: 9px;
          }

          .market-container {
            width: 94%;
            padding-top: 35px;
          }

          .market-hero h1 {
            font-size: 42px;
          }

          .market-stats {
            display: grid;
            grid-template-columns: repeat(3,1fr);
          }

          .market-stats > div {
            min-width: 0;
            padding: 12px;
          }

          .market-stats strong {
            font-size: 17px;
          }

          .market-stats span {
            font-size: 8px;
          }

          .market-toolbar {
            top: 82px;
          }

          .results-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }

          .feature-right small {
            display: none;
          }

          .explanation-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}