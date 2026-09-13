# Configuration modules

Configuration under this directory is intentionally provider-agnostic. Business data should remain tenant-scoped and should be loaded from the application's existing settings layer.

The productization layer adds defaults only; it must not override values configured by a business.
