import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  Building2,
  ChevronDown,
  Home,
  Info,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const initialForm = {
  MSSubClass: "60",
  MSZoning: "RL",
  LotFrontage: "65",
  LotArea: "8450",
  Street: "Pave",
  Alley: "NA",
  LotShape: "Reg",
  LandContour: "Lvl",
  Utilities: "AllPub",
  LotConfig: "Inside",
  LandSlope: "Gtl",
  Neighborhood: "CollgCr",
  Condition1: "Norm",
  Condition2: "Norm",
  BldgType: "1Fam",
  HouseStyle: "2Story",

  OverallQual: "7",
  OverallCond: "5",
  YearBuilt: "2003",
  YearRemodAdd: "2003",

  RoofStyle: "Gable",
  RoofMatl: "CompShg",
  Exterior1st: "VinylSd",
  Exterior2nd: "VinylSd",
  MasVnrType: "BrkFace",
  MasVnrArea: "196",

  ExterQual: "Gd",
  ExterCond: "TA",
  Foundation: "PConc",

  BsmtQual: "Gd",
  BsmtCond: "TA",
  BsmtExposure: "No",
  BsmtFinType1: "GLQ",
  BsmtFinSF1: "706",
  BsmtFinType2: "Unf",
  BsmtFinSF2: "0",
  BsmtUnfSF: "150",
  TotalBsmtSF: "856",

  Heating: "GasA",
  HeatingQC: "Ex",
  CentralAir: "Y",
  Electrical: "SBrkr",

  "1stFlrSF": "856",
  "2ndFlrSF": "854",
  LowQualFinSF: "0",
  GrLivArea: "1710",

  BsmtFullBath: "1",
  BsmtHalfBath: "0",
  FullBath: "2",
  HalfBath: "1",
  BedroomAbvGr: "3",
  KitchenAbvGr: "1",
  KitchenQual: "Gd",
  TotRmsAbvGrd: "8",

  Functional: "Typ",
  Fireplaces: "0",
  FireplaceQu: "NA",

  GarageType: "Attchd",
  GarageYrBlt: "2003",
  GarageFinish: "RFn",
  GarageCars: "2",
  GarageArea: "548",
  GarageQual: "TA",
  GarageCond: "TA",
  PavedDrive: "Y",

  WoodDeckSF: "0",
  OpenPorchSF: "61",
  EnclosedPorch: "0",
  "3SsnPorch": "0",
  ScreenPorch: "0",
  PoolArea: "0",
  PoolQC: "NA",
  Fence: "NA",
  MiscFeature: "NA",
  MiscVal: "0",

  MoSold: "2",
  YrSold: "2008",
  SaleType: "WD",
  SaleCondition: "Normal",
};

const sections = [
  {
    title: "Property Classification",
    icon: Building2,
    fields: [
      {
        name: "MSSubClass",
        label: "Building Class",
        type: "number",
        hint: "MSSubClass",
      },
      {
        name: "MSZoning",
        label: "Zoning Classification",
        type: "select",
        options: ["A", "C (all)", "FV", "I", "RH", "RL", "RP", "RM"],
      },
      {
        name: "BldgType",
        label: "Building Type",
        type: "select",
        options: ["1Fam", "2fmCon", "Duplex", "TwnhsE", "Twnhs"],
      },
      {
        name: "HouseStyle",
        label: "House Style",
        type: "select",
        options: [
          "1Story",
          "1.5Fin",
          "1.5Unf",
          "2Story",
          "2.5Fin",
          "2.5Unf",
          "SFoyer",
          "SLvl",
        ],
      },
    ],
  },

  {
    title: "Land & Location Characteristics",
    icon: Home,
    fields: [
      {
        name: "LotFrontage",
        label: "Lot Frontage",
        type: "number",
        suffix: "ft",
      },
      {
        name: "LotArea",
        label: "Lot Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "Street",
        label: "Street Type",
        type: "select",
        options: ["Grvl", "Pave"],
      },
      {
        name: "Alley",
        label: "Alley",
        type: "select",
        options: ["NA", "Grvl", "Pave"],
      },
      {
        name: "LotShape",
        label: "Lot Shape",
        type: "select",
        options: ["Reg", "IR1", "IR2", "IR3"],
      },
      {
        name: "LandContour",
        label: "Land Contour",
        type: "select",
        options: ["Lvl", "Bnk", "HLS", "Low"],
      },
      {
        name: "Utilities",
        label: "Utilities",
        type: "select",
        options: ["AllPub", "NoSewr", "NoSeWa", "ELO"],
      },
      {
        name: "LotConfig",
        label: "Lot Configuration",
        type: "select",
        options: ["Inside", "Corner", "CulDSac", "FR2", "FR3"],
      },
      {
        name: "LandSlope",
        label: "Land Slope",
        type: "select",
        options: ["Gtl", "Mod", "Sev"],
      },
      {
        name: "Neighborhood",
        label: "Neighborhood",
        type: "select",
        options: [
          "Blmngtn",
          "Blueste",
          "BrDale",
          "BrkSide",
          "ClearCr",
          "CollgCr",
          "Crawfor",
          "Edwards",
          "Gilbert",
          "IDOTRR",
          "MeadowV",
          "Mitchel",
          "NAmes",
          "NoRidge",
          "NPkVill",
          "NridgHt",
          "NWAmes",
          "OldTown",
          "SWISU",
          "Sawyer",
          "SawyerW",
          "Somerst",
          "StoneBr",
          "Timber",
          "Veenker",
        ],
      },
      {
        name: "Condition1",
        label: "Primary Condition",
        type: "select",
        options: [
          "Artery",
          "Feedr",
          "Norm",
          "RRNn",
          "RRAn",
          "PosN",
          "PosA",
          "RRNe",
          "RRAe",
        ],
      },
      {
        name: "Condition2",
        label: "Secondary Condition",
        type: "select",
        options: [
          "Artery",
          "Feedr",
          "Norm",
          "RRNn",
          "RRAn",
          "PosN",
          "PosA",
          "RRNe",
          "RRAe",
        ],
      },
    ],
  },

  {
    title: "Quality & Construction",
    icon: Sparkles,
    fields: [
      {
        name: "OverallQual",
        label: "Overall Quality",
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      {
        name: "OverallCond",
        label: "Overall Condition",
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      {
        name: "YearBuilt",
        label: "Year Built",
        type: "number",
      },
      {
        name: "YearRemodAdd",
        label: "Remodel Year",
        type: "number",
      },
      {
        name: "RoofStyle",
        label: "Roof Style",
        type: "select",
        options: ["Flat", "Gable", "Gambrel", "Hip", "Mansard", "Shed"],
      },
      {
        name: "RoofMatl",
        label: "Roof Material",
        type: "select",
        options: [
          "ClyTile",
          "CompShg",
          "Membran",
          "Metal",
          "Roll",
          "Tar&Grv",
          "WdShake",
          "WdShngl",
        ],
      },
      {
        name: "Exterior1st",
        label: "Exterior Material 1",
        type: "select",
        options: [
          "AsbShng",
          "AsphShn",
          "BrkComm",
          "BrkFace",
          "CBlock",
          "CemntBd",
          "HdBoard",
          "ImStucc",
          "MetalSd",
          "Other",
          "Plywood",
          "PreCast",
          "Stone",
          "Stucco",
          "VinylSd",
          "Wd Sdng",
          "WdShing",
        ],
      },
      {
        name: "Exterior2nd",
        label: "Exterior Material 2",
        type: "select",
        options: [
          "AsbShng",
          "AsphShn",
          "Brk Cmn",
          "BrkFace",
          "CBlock",
          "CmentBd",
          "HdBoard",
          "ImStucc",
          "MetalSd",
          "Other",
          "Plywood",
          "PreCast",
          "Stone",
          "Stucco",
          "VinylSd",
          "Wd Sdng",
          "Wd Shng",
        ],
      },
      {
        name: "MasVnrType",
        label: "Masonry Type",
        type: "select",
        options: ["None", "BrkCmn", "BrkFace", "Stone"],
      },
      {
        name: "MasVnrArea",
        label: "Masonry Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "ExterQual",
        label: "Exterior Quality",
        type: "select",
        options: ["Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "ExterCond",
        label: "Exterior Condition",
        type: "select",
        options: ["Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "Foundation",
        label: "Foundation",
        type: "select",
        options: ["BrkTil", "CBlock", "PConc", "Slab", "Stone", "Wood"],
      },
    ],
  },

  {
    title: "Basement Details",
    icon: Building2,
    fields: [
      {
        name: "BsmtQual",
        label: "Basement Quality",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "BsmtCond",
        label: "Basement Condition",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "BsmtExposure",
        label: "Basement Exposure",
        type: "select",
        options: ["NA", "Gd", "Av", "Mn", "No"],
      },
      {
        name: "BsmtFinType1",
        label: "Basement Finish Type 1",
        type: "select",
        options: ["NA", "GLQ", "ALQ", "BLQ", "Rec", "LwQ", "Unf"],
      },
      {
        name: "BsmtFinSF1",
        label: "Basement Finished Area 1",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "BsmtFinType2",
        label: "Basement Finish Type 2",
        type: "select",
        options: ["NA", "GLQ", "ALQ", "BLQ", "Rec", "LwQ", "Unf"],
      },
      {
        name: "BsmtFinSF2",
        label: "Basement Finished Area 2",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "BsmtUnfSF",
        label: "Unfinished Basement Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "TotalBsmtSF",
        label: "Total Basement Area",
        type: "number",
        suffix: "sq ft",
      },
    ],
  },

  {
    title: "Utilities & Interior",
    icon: WandSparkles,
    fields: [
      {
        name: "Heating",
        label: "Heating System",
        type: "select",
        options: [
          "Floor",
          "GasA",
          "GasW",
          "Grav",
          "OthW",
          "Wall",
        ],
      },
      {
        name: "HeatingQC",
        label: "Heating Quality",
        type: "select",
        options: ["Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "CentralAir",
        label: "Central Air",
        type: "select",
        options: ["Y", "N"],
      },
      {
        name: "Electrical",
        label: "Electrical System",
        type: "select",
        options: ["SBrkr", "FuseA", "FuseF", "FuseP", "Mix"],
      },
      {
        name: "1stFlrSF",
        label: "1st Floor Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "2ndFlrSF",
        label: "2nd Floor Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "LowQualFinSF",
        label: "Low Quality Finished Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "GrLivArea",
        label: "Above Ground Living Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "BsmtFullBath",
        label: "Basement Full Bathrooms",
        type: "number",
      },
      {
        name: "BsmtHalfBath",
        label: "Basement Half Bathrooms",
        type: "number",
      },
      {
        name: "FullBath",
        label: "Full Bathrooms",
        type: "number",
      },
      {
        name: "HalfBath",
        label: "Half Bathrooms",
        type: "number",
      },
      {
        name: "BedroomAbvGr",
        label: "Bedrooms Above Ground",
        type: "number",
      },
      {
        name: "KitchenAbvGr",
        label: "Kitchens",
        type: "number",
      },
      {
        name: "KitchenQual",
        label: "Kitchen Quality",
        type: "select",
        options: ["Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "TotRmsAbvGrd",
        label: "Total Rooms Above Ground",
        type: "number",
      },
    ],
  },

  {
    title: "Fireplace & Garage",
    icon: Building2,
    fields: [
      {
        name: "Functional",
        label: "Home Functionality",
        type: "select",
        options: [
          "Typ",
          "Min1",
          "Min2",
          "Mod",
          "Maj1",
          "Maj2",
          "Sev",
          "Sal",
        ],
      },
      {
        name: "Fireplaces",
        label: "Fireplaces",
        type: "number",
      },
      {
        name: "FireplaceQu",
        label: "Fireplace Quality",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "GarageType",
        label: "Garage Type",
        type: "select",
        options: [
          "NA",
          "2Types",
          "Attchd",
          "Basment",
          "BuiltIn",
          "CarPort",
          "Detchd",
        ],
      },
      {
        name: "GarageYrBlt",
        label: "Garage Year Built",
        type: "number",
      },
      {
        name: "GarageFinish",
        label: "Garage Finish",
        type: "select",
        options: ["NA", "Fin", "RFn", "Unf"],
      },
      {
        name: "GarageCars",
        label: "Garage Capacity",
        type: "number",
      },
      {
        name: "GarageArea",
        label: "Garage Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "GarageQual",
        label: "Garage Quality",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "GarageCond",
        label: "Garage Condition",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa", "Po"],
      },
      {
        name: "PavedDrive",
        label: "Paved Driveway",
        type: "select",
        options: ["Y", "P", "N"],
      },
    ],
  },

  {
    title: "Outdoor Features",
    icon: Home,
    fields: [
      {
        name: "WoodDeckSF",
        label: "Wood Deck Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "OpenPorchSF",
        label: "Open Porch Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "EnclosedPorch",
        label: "Enclosed Porch Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "3SsnPorch",
        label: "3 Season Porch Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "ScreenPorch",
        label: "Screen Porch Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "PoolArea",
        label: "Pool Area",
        type: "number",
        suffix: "sq ft",
      },
      {
        name: "PoolQC",
        label: "Pool Quality",
        type: "select",
        options: ["NA", "Ex", "Gd", "TA", "Fa"],
      },
      {
        name: "Fence",
        label: "Fence",
        type: "select",
        options: ["NA", "GdPrv", "MnPrv", "GdWo", "MnWw"],
      },
      {
        name: "MiscFeature",
        label: "Miscellaneous Feature",
        type: "select",
        options: ["NA", "Elev", "Gar2", "Othr", "Shed", "TenC"],
      },
      {
        name: "MiscVal",
        label: "Miscellaneous Value",
        type: "number",
      },
    ],
  },

  {
    title: "Sale Information",
    icon: Sparkles,
    fields: [
      {
        name: "MoSold",
        label: "Month Sold",
        type: "select",
        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      },
      {
        name: "YrSold",
        label: "Year Sold",
        type: "number",
      },
      {
        name: "SaleType",
        label: "Sale Type",
        type: "select",
        options: [
          "WD",
          "CWD",
          "VWD",
          "New",
          "COD",
          "Con",
          "ConLw",
          "ConLI",
          "ConLD",
          "Oth",
        ],
      },
      {
        name: "SaleCondition",
        label: "Sale Condition",
        type: "select",
        options: [
          "Normal",
          "Abnorml",
          "AdjLand",
          "Alloca",
          "Family",
          "Partial",
        ],
      },
    ],
  },
];

function Field({ field, value, onChange }) {
  const isSelect = field.type === "select";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">
        {field.label}
      </label>

      <div className="relative">
        {isSelect ? (
          <>
            <select
              value={value ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5 pr-11 text-sm text-white outline-none transition-all focus:border-amber-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-amber-400/10"
            >
              {field.options.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-[#10131d] text-white"
                >
                  {option}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
            />
          </>
        ) : (
          <input
            type="number"
            value={value ?? ""}
            onChange={(event) => onChange(field.name, event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-amber-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-amber-400/10"
          />
        )}

        {field.suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/35">
            {field.suffix}
          </span>
        )}
      </div>

      <p className="text-[10px] uppercase tracking-wider text-white/25">
        {field.hint || field.name}
      </p>
    </div>
  );
}

function PredictionPage({
  user,
  onBack,
  onSubmit,
})  {
  const [form, setForm] = useState(initialForm);
  const [activeSection, setActiveSection] = useState(0);

  const totalFields = useMemo(
    () => sections.reduce((total, section) => total + section.fields.length, 0),
    []
  );

  const filledFields = useMemo(() => {
    return Object.values(form).filter(
      (value) => value !== undefined && value !== null && value !== ""
    ).length;
  }, [form]);

  const completion =
    totalFields === 0
      ? 0
      : Math.round((filledFields / totalFields) * 100);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedData = {};

    Object.entries(form).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        cleanedData[key] = null;
        return;
      }

      const numericFields = [
        "MSSubClass",
        "LotFrontage",
        "LotArea",
        "OverallQual",
        "OverallCond",
        "YearBuilt",
        "YearRemodAdd",
        "MasVnrArea",
        "BsmtFinSF1",
        "BsmtFinSF2",
        "BsmtUnfSF",
        "TotalBsmtSF",
        "1stFlrSF",
        "2ndFlrSF",
        "LowQualFinSF",
        "GrLivArea",
        "BsmtFullBath",
        "BsmtHalfBath",
        "FullBath",
        "HalfBath",
        "BedroomAbvGr",
        "KitchenAbvGr",
        "TotRmsAbvGrd",
        "Fireplaces",
        "GarageYrBlt",
        "GarageCars",
        "GarageArea",
        "WoodDeckSF",
        "OpenPorchSF",
        "EnclosedPorch",
        "3SsnPorch",
        "ScreenPorch",
        "PoolArea",
        "MiscVal",
        "MoSold",
        "YrSold",
      ];

      cleanedData[key] = numericFields.includes(key)
        ? Number(value)
        : value;
    });

  onSubmit({
      ...cleanedData,

      // Metadata for GrihaDrishti UI.
      submittedBy: user?.email || null,
      predictionTarget: "SalePrice",
      dataset: "Ames Housing / House Prices",
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070d] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute right-[-10%] top-[25%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-300/20 to-purple-500/10">
              <Building2 size={21} className="text-amber-200" />

              <span className="absolute inset-0 rounded-2xl border border-white/5" />
            </div>

            <div>
              <div className="text-lg font-semibold tracking-tight">
                GrihaDrishti
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
                AI Property Intelligence
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-9"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.06] px-3.5 py-2 text-xs font-medium text-amber-100/80">
            <BrainCircuit size={14} />
            Smart Valuation
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Predict Your
            <span className="block bg-gradient-to-r from-white via-amber-100 to-purple-200 bg-clip-text text-transparent">
              Property Value
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/45 sm:text-base">
            Enter the property characteristics used by the House Prices
            dataset. GrihaDrishti will process the complete feature set and
            send it to the trained ML valuation model.
          </p>
        </motion.div>

        {/* Dataset status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-7 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-200">
                <BrainCircuit size={20} />
              </div>

              <div>
                <div className="font-medium">
                  Ames Housing / House Prices Dataset
                </div>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {totalFields} model features collected ·{" "}
                  <span className="text-white/65">{completion}%</span> form
                  completion
                </p>
              </div>
            </div>

            <div className="w-full md:max-w-xs">
              <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-white/30">
                <span>Feature Coverage</span>
                <span>{completion}%</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${completion}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-purple-400"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:h-fit">
              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
                <div className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Property Features
                </div>

                <div className="space-y-1">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    const active = activeSection === index;

                    return (
                      <button
                        type="button"
                        key={section.title}
                        onClick={() => {
                          setActiveSection(index);

                          document
                            .getElementById(`section-${index}`)
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-all ${
                          active
                            ? "border border-amber-300/10 bg-amber-300/[0.08] text-white"
                            : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={
                            active ? "text-amber-200" : "text-white/30"
                          }
                        />

                        <span className="leading-5">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main form */}
            <div className="space-y-7">
              {sections.map((section, sectionIndex) => {
                const Icon = section.icon;

                return (
                  <motion.section
                    id={`section-${sectionIndex}`}
                    key={section.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    onViewportEnter={() => setActiveSection(sectionIndex)}
                    className="scroll-mt-28 rounded-[30px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:p-7"
                  >
                    <div className="mb-7 flex items-center gap-4 border-b border-white/8 pb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] text-amber-200">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold">
                          {section.title}
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                          Dataset feature configuration
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                      {section.fields.map((field) => (
                        <Field
                          key={field.name}
                          field={field}
                          value={form[field.name]}
                          onChange={updateField}
                        />
                      ))}
                    </div>
                  </motion.section>
                );
              })}

              {/* Important note */}
              <div className="flex gap-4 rounded-3xl border border-blue-300/10 bg-blue-400/[0.045] p-5">
                <div className="mt-0.5 shrink-0 text-blue-200">
                  <Info size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-blue-100">
                    How GrihaDrishti uses these values
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-white/40">
                    These fields correspond to the supplied House Prices
                    dataset. <strong className="text-white/60">Id</strong> is
                    treated only as an identifier and{" "}
                    <strong className="text-white/60">SalePrice</strong> is the
                    prediction target. The trained model will perform the
                    required categorical encoding and numerical preprocessing
                    before generating the final valuation.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="sticky bottom-4 z-20">
                <div className="rounded-3xl border border-white/10 bg-[#0a0d15]/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-200 via-amber-100 to-purple-200 px-6 py-4 font-semibold text-[#101116] shadow-lg shadow-amber-200/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-200/20"
                  >
                    <WandSparkles
                      size={19}
                      className="transition-transform group-hover:rotate-12"
                    />

                    <span>Analyze Property with AI</span>

                    <Sparkles
                      size={17}
                      className="transition-transform group-hover:scale-110"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PredictionPage;