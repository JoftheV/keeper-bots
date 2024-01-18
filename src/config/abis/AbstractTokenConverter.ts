// @kkirka: This is a typescript file and not a JSON file because I wanted to keep
// the narrow type for viem (importing from JSON yields an array of garbage). I guess
// we could generate these files similarly to how it's done in the frontend repo
// (in the postinstall script), but I'd keep this up for discussion for now.

export default [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMaxMantissa",
        type: "uint256",
      },
    ],
    name: "AmountInHigherThanMax",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountInMismatched",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinMantissa",
        type: "uint256",
      },
    ],
    name: "AmountOutLowerThanMinRequired",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountOutMismatched",
    type: "error",
  },
  {
    inputs: [],
    name: "ConversionConfigNotEnabled",
    type: "error",
  },
  {
    inputs: [],
    name: "ConversionEnabledOnlyForPrivateConversions",
    type: "error",
  },
  {
    inputs: [],
    name: "ConversionTokensActive",
    type: "error",
  },
  {
    inputs: [],
    name: "ConversionTokensPaused",
    type: "error",
  },
  {
    inputs: [],
    name: "DeflationaryTokenNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "incentive",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxIncentive",
        type: "uint256",
      },
    ],
    name: "IncentiveTooHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "InputLengthMisMatch",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientInputAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientOutputAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientPoolLiquidity",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidConverterNetwork",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMinimumAmountToConvert",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidToAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTokenConfigAddresses",
    type: "error",
  },
  {
    inputs: [],
    name: "NonZeroIncentiveForPrivateConversion",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "calledContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "methodSignature",
        type: "string",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddressNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroValueNotAllowed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newIncentive",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum IAbstractTokenConverter.ConversionAccessibility",
        name: "oldAccess",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum IAbstractTokenConverter.ConversionAccessibility",
        name: "newAccess",
        type: "uint8",
      },
    ],
    name: "ConversionConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ConversionPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ConversionResumed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ConvertedExactTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ConvertedExactTokensSupportingFeeOnTransferTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ConvertedForExactTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "ConvertedForExactTokensSupportingFeeOnTransferTokens",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldConverterNetwork",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "converterNetwork",
        type: "address",
      },
    ],
    name: "ConverterNetworkAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldDestinationAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
    ],
    name: "DestinationAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMinAmountToConvert",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMinAmountToConvert",
        type: "uint256",
      },
    ],
    name: "MinAmountToConvertUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAccessControlManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAccessControlManager",
        type: "address",
      },
    ],
    name: "NewAccessControlManager",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ResilientOracle",
        name: "oldPriceOracle",
        type: "address",
      },
      {
        indexed: true,
        internalType: "contract ResilientOracle",
        name: "priceOracle",
        type: "address",
      },
    ],
    name: "PriceOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SweepToken",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_INCENTIVE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "accessControlManager",
    outputs: [
      {
        internalType: "contract IAccessControlManagerV8",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "conversionConfigurations",
    outputs: [
      {
        internalType: "uint256",
        name: "incentive",
        type: "uint256",
      },
      {
        internalType: "enum IAbstractTokenConverter.ConversionAccessibility",
        name: "conversionAccess",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "conversionPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "convertExactTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "convertExactTokensSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMaxMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "convertForExactTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMaxMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "convertForExactTokensSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "actualAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualAmountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "converterNetwork",
    outputs: [
      {
        internalType: "contract IConverterNetwork",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "destinationAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
    ],
    name: "getAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountConvertedMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
    ],
    name: "getAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountConvertedMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
    ],
    name: "getUpdatedAmountIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountConvertedMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountInMantissa",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
    ],
    name: "getUpdatedAmountOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountConvertedMantissa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMantissa",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minAmountToConvert",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseConversion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOracle",
    outputs: [
      {
        internalType: "contract ResilientOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resumeConversion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accessControlManager_",
        type: "address",
      },
    ],
    name: "setAccessControlManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddressOut",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "incentive",
            type: "uint256",
          },
          {
            internalType: "enum IAbstractTokenConverter.ConversionAccessibility",
            name: "conversionAccess",
            type: "uint8",
          },
        ],
        internalType: "struct IAbstractTokenConverter.ConversionConfig",
        name: "conversionConfig",
        type: "tuple",
      },
    ],
    name: "setConversionConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddressIn",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "tokenAddressesOut",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "incentive",
            type: "uint256",
          },
          {
            internalType: "enum IAbstractTokenConverter.ConversionAccessibility",
            name: "conversionAccess",
            type: "uint8",
          },
        ],
        internalType: "struct IAbstractTokenConverter.ConversionConfig[]",
        name: "conversionConfigs",
        type: "tuple[]",
      },
    ],
    name: "setConversionConfigs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IConverterNetwork",
        name: "converterNetwork_",
        type: "address",
      },
    ],
    name: "setConverterNetwork",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinationAddress_",
        type: "address",
      },
    ],
    name: "setDestination",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minAmountToConvert_",
        type: "uint256",
      },
    ],
    name: "setMinAmountToConvert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ResilientOracle",
        name: "priceOracle_",
        type: "address",
      },
    ],
    name: "setPriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "comptroller",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "updateAssetsState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
