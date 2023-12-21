'use client'

import {
  type Config,
  type EstimateFeesPerGasErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type EstimateFeesPerGasData,
  type EstimateFeesPerGasOptions,
  type EstimateFeesPerGasQueryFnData,
  type EstimateFeesPerGasQueryKey,
  estimateFeesPerGasQueryOptions,
} from '@wagmi/core/query'
import type { FeeValuesType } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateFeesPerGasParameters<
  type extends FeeValuesType = FeeValuesType,
  config extends Config = Config,
  selectData = EstimateFeesPerGasData<type>,
> = Evaluate<
  EstimateFeesPerGasOptions<type, config> &
    ConfigParameter<config> &
    QueryParameter<
      EstimateFeesPerGasQueryFnData<type>,
      EstimateFeesPerGasErrorType,
      selectData,
      EstimateFeesPerGasQueryKey<config, type>
    >
>

export type UseEstimateFeesPerGasReturnType<
  type extends FeeValuesType = FeeValuesType,
  selectData = EstimateFeesPerGasData<type>,
> = UseQueryReturnType<selectData, EstimateFeesPerGasErrorType>

/** https://rc.wagmi.sh/react/api/hooks/useEstimateFeesPerGas */
export function useEstimateFeesPerGas<
  config extends Config = ResolvedRegister['config'],
  type extends FeeValuesType = 'eip1559',
  selectData = EstimateFeesPerGasData<type>,
>(
  parameters: UseEstimateFeesPerGasParameters<type, config, selectData> = {},
): UseEstimateFeesPerGasReturnType<type, selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const options = estimateFeesPerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...query, ...options })
}
