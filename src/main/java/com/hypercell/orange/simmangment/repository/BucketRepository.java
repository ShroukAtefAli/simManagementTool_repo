package com.hypercell.orange.simmangment.repository;

import com.hypercell.orange.simmangment.domain.Bucket;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Bucket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BucketRepository extends JpaRepository<Bucket, Long> {}
